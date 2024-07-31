<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <GameOverModal v-if="isGameOver.showModal" :players="players" />
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
    }"
    @handle-select-dice="(event) => handleSelectDice(event.diceValue, event.isActionSocket)"
    @update-tokens="updateTokens"
  />
</template>

<script setup lang="ts">
import { inject, ref, watch } from 'vue';
import GameBoard from '@/modules/board/components/game-board.vue';
import GameDebug from '@/modules/debug/components/game-debug/game-debug.vue';
import ShowTotalTokens from '@/modules/tokens/components/token/components/total-tokens/show-total-tokens.vue';
import BoardWrapper from '@/modules/board/components/board-wrapper.vue';
import ProfileSection from '@/modules/profiles/layouts/profile-section.vue';
import { EBoardColors, EPositionProfiles } from '@/modules/board/constants/board';
import {
  EActionsBoardGame,
  ETypeGame,
  INITIAL_ACTIONS_MOVE_TOKEN,
  OptionsGamePlaySoundSymbol,
  TOKEN_MOVEMENT_INTERVAL_VALUE,
  WAIT_SHOW_MODAL_GAME_OVER,
} from '@/modules/game/constants/game';
import type {
  IActionsTurn,
  IGameOver,
  TTotalPlayers,
  TTypeGame,
} from '@/modules/game/interfaces/game';
import type { IPlayer, IUser } from '@/modules/players/interfaces/user';
import type { TBoardColors } from '@/modules/board/interfaces/board';
import type { TDiceValues } from '@/modules/dice/interfaces/dice';
import type {
  IActionsMoveToken,
  IListTokens,
  ISelectTokenValues,
  TShowTotalTokens,
} from '@/modules/tokens/interfaces/token';
import { getInitialDataPlayers } from '@/modules/players/helpers/player';
import {
  getInitialActionsTurnValue,
  getInitialPositionTokens,
  validateDicesForTokens,
  validateMovementToken,
  validateSelectedToken,
  validateSelectTokenRandomly,
} from '@/modules/game/helpers/game';
import { getRandomValueDice } from '@/modules/common/helpers/random';
import TokenList from '@/modules/tokens/components/tokens/token-list.vue';
import GameDebugTokens from '@/modules/debug/components/game-debug-tokens/game-debug-tokens.vue';
import GameOverModal from '@/modules/game/components/over/game-over-modal.vue';
import type { TPlaySoundFunction } from '@/modules/sounds/interfaces/sounds';
import { ESounds } from '@/modules/online/constants/online';

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

const playSound: TPlaySoundFunction = inject<TPlaySoundFunction>(OptionsGamePlaySoundSymbol)!;

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

  if (ends || isBot) {
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
  playSound(ESounds.ROLL_DICE);
}

function handleDoneDice(isActionSocket: boolean = false): void {
  validateDicesForTokens(
    actionsTurn.value,
    currentTurn.value,
    listTokens.value,
    players.value,
    totalTokens.value,
    playSound,
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
          playSound,
        ).then((validatedTokenMovement) => {
          actionsTurn.value = validatedTokenMovement.actionsTurn;
          actionsMoveToken.value = validatedTokenMovement.actionsMoveToken;
          listTokens.value = validatedTokenMovement.listTokens;
          totalTokens.value = validatedTokenMovement.totalTokens;
          players.value = validatedTokenMovement.players;
          currentTurn.value = validatedTokenMovement.currentTurn;

          setTimeout(() => {
            if (validatedTokenMovement.gameOverState) {
              isGameOver.value = validatedTokenMovement.gameOverState;
            }
          }, WAIT_SHOW_MODAL_GAME_OVER);

          if (!validatedTokenMovement.actionsMoveToken.isRunning) {
            clearInterval(interval);
          }
        });
      }, TOKEN_MOVEMENT_INTERVAL_VALUE);
    }
  },
);
</script>
