<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <PageWrapper>
    <template #default>
      <div v-if="isGameOver.showModal">Game over</div>
      <BoardWrapper>
        <!-- prettier-ignore-attribute -->
        <ProfileSection
          :base-position="EPositionProfiles.TOP"
          :players="players"
          :total-players="(players.length as TTotalPlayers)"
          :current-turn="currentTurn"
          :actions-turn="actionsTurn"
          @handle-timer="handleTimer"
          @handle-select-dice="handleSelectDice"
          @handle-done-dice="handleDoneDice"
          @handle-mute-chat="handleMuteChat"
        />
        <!-- prettier-ignore-attribute -->
        <GameBoard :boardColor="(boardColor as EBoardColors)">
          <TokenList
            :dice-list="actionsTurn.diceList"
            :list-token="listTokens"
            :debug="debug"
            @handle-selected-token="handleSelectedToken"
          />
          <GameDebug v-if="debug" />
          <ShowTotalTokens :total-tokens="totalTokens" />
        </GameBoard>
        <!-- prettier-ignore-attribute -->
        <ProfileSection
          :base-position="EPositionProfiles.BOTTOM"
          :players="players"
          :total-players="(players.length as TTotalPlayers)"
          :current-turn="currentTurn"
          :actions-turn="actionsTurn"
          @handle-timer="handleTimer"
          @handle-select-dice="handleSelectDice"
          @handle-done-dice="handleDoneDice"
          @handle-mute-chat="handleMuteChat"
        />
      </BoardWrapper>
      <GameDebugTokens
        v-if="debug"
        v-bind="{
          typeGame,
          players,
          listTokens,
          actionsTurn,
          handleSelectDice,
        }"
        @handle-select-dice="(event) => handleSelectDice(event.diceValue, event.isActionSocket)"
        @update-tokens="updateTokens"
      />
    </template>
  </PageWrapper>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import PageWrapper from '@/layout/page-wrapper.vue';
import GameBoard from '@/components/game/board/game-board.vue';
import GameDebug from '@/components/game/debug/game-debug.vue';
import ShowTotalTokens from '@/components/game/token/components/total-tokens/show-total-tokens.vue';
import BoardWrapper from '@/components/game/board/board-wrapper.vue';
import ProfileSection from '@/components/game/profiles/profile-section.vue';
import { EBoardColors, EPositionProfiles } from '@/constants/board';
import {
  EActionsBoardGame,
  ETypeGame,
  INITIAL_ACTIONS_MOVE_TOKEN,
  TOKEN_MOVEMENT_INTERVAL_VALUE,
} from '@/constants/game';
import type { IActionsTurn, IGameOver, TTotalPlayers, TTypeGame } from '@/interfaces/game';
import type { IPlayer, IUser } from '@/interfaces/user';
import type { TBoardColors } from '@/interfaces/board';
import type { TDiceValues } from '@/interfaces/dice';
import type {
  IActionsMoveToken,
  IListTokens,
  ISelectTokenValues,
  TShowTotalTokens,
} from '@/interfaces/token';
import { getInitialDataPlayers } from '@/helpers/player';
import {
  getInitialActionsTurnValue,
  getInitialPositionTokens,
  validateDicesForTokens,
  validateMovementToken,
  validateSelectedToken,
  validateSelectTokenRandomly,
} from '@/helpers/game';
import { getRandomValueDice } from '@/helpers/random';
import TokenList from '@/components/game/tokens/token-list.vue';
import GameDebugTokens from '@/components/game/debug/game-debug-tokens.vue';

// TODO: Add types for socket
interface GameProps {
  totalPlayers: TTotalPlayers;
  initialTurn: number;
  users: IUser[];
  typeGame?: TTypeGame;
  boardColor?: TBoardColors;
  debug?: boolean;
}

const props = withDefaults(defineProps<GameProps>(), {
  totalPlayers: 2,
  initialTurn: 0,
  users: [] as unknown as () => IUser[],
  typeGame: ETypeGame.OFFLINE,
  boardColor: EBoardColors.RGYB,
  debug: false,
});

const players = ref<IPlayer[]>(
  getInitialDataPlayers(props.users, props.boardColor, props.totalPlayers),
);
const actionsTurn = ref<IActionsTurn>(getInitialActionsTurnValue(props.initialTurn, players.value));
const currentTurn = ref<number>(props.initialTurn);
const actionsMoveToken = ref<IActionsMoveToken>(INITIAL_ACTIONS_MOVE_TOKEN);
const listTokens = ref<IListTokens[]>(
  getInitialPositionTokens(props.boardColor, props.totalPlayers, players.value),
);
const totalTokens = ref<TShowTotalTokens>({});
const isGameOver = ref<IGameOver>({ gameOver: false, showModal: false });

function handleSelectedToken(selectedTokenValues: ISelectTokenValues): void {
  const validatedSelectedToken = validateSelectedToken(
    actionsTurn.value,
    listTokens.value,
    currentTurn.value,
    selectedTokenValues.diceIndex,
    selectedTokenValues.tokenIndex,
    totalTokens.value,
  );

  actionsTurn.value = validatedSelectedToken.actionsTurn;
  actionsMoveToken.value = validatedSelectedToken.actionsMoveToken;
  listTokens.value = validatedSelectedToken.listTokens;
  totalTokens.value = validatedSelectedToken.totalTokens;
}

function handleTimer(ends: boolean = false): void {
  const { isBot } = players.value[currentTurn.value];
  const makeAutomaticMovement: boolean = ends || isBot;

  if (makeAutomaticMovement) {
    if (actionsTurn.value.actionsBoardGame === EActionsBoardGame.ROLL_DICE) {
      handleSelectDice();
    }

    if (actionsTurn.value.actionsBoardGame === EActionsBoardGame.SELECT_TOKEN) {
      const { diceIndex, tokenIndex } = validateSelectTokenRandomly(
        listTokens.value,
        actionsTurn.value.diceList,
        currentTurn.value,
      );
      handleSelectedToken({ diceIndex, tokenIndex });
    }
  }
}

function handleSelectDice(diceValue?: TDiceValues, isActionSocket: boolean = false): void {
  actionsTurn.value = getRandomValueDice(
    actionsTurn.value,
    // TODO: Provisional fix. Fix later
    typeof diceValue !== 'object' ? diceValue : undefined,
  );
}

function handleDoneDice(isActionSocket: boolean = false): void {
  validateDicesForTokens(
    actionsTurn.value,
    currentTurn.value,
    listTokens.value,
    players.value,
    totalTokens.value,
  ).then((res) => {
    actionsTurn.value = res.actionsTurn;
    listTokens.value = res.listTokens;
    currentTurn.value = res.nextTurn;
    totalTokens.value = res.totalTokens;

    if (res.actionsMoveToken) {
      actionsMoveToken.value = res.actionsMoveToken;
    }
  });
}

function handleMuteChat(playerIndex: number): void {}

function updateTokens(newListTokens: IListTokens[]): void {
  listTokens.value = newListTokens;
}

watch(
  () => actionsMoveToken.value.isRunning,
  (newValue: boolean) => {
    if (newValue) {
      const interval = setInterval(() => {
        validateMovementToken(
          actionsMoveToken.value,
          actionsTurn.value,
          currentTurn.value,
          listTokens.value,
          players.value,
          totalTokens.value,
        ).then((validatedTokenMovement) => {
          actionsTurn.value = validatedTokenMovement.actionsTurn;
          actionsMoveToken.value = validatedTokenMovement.actionsMoveToken;
          listTokens.value = validatedTokenMovement.listTokens;
          totalTokens.value = validatedTokenMovement.totalTokens;
          players.value = validatedTokenMovement.players;
          currentTurn.value = validatedTokenMovement.currentTurn;

          if (validatedTokenMovement.gameOverState) {
            isGameOver.value = validatedTokenMovement.gameOverState;
          }

          if (!validatedTokenMovement.actionsMoveToken.isRunning) {
            clearInterval(interval);
          }
        });
      }, TOKEN_MOVEMENT_INTERVAL_VALUE);
    }
  },
);
</script>
