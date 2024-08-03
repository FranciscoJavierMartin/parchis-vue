<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <GameOverModal v-if="isGameOver.showModal" :players="players" />
  <div class="game-board-wrapper">
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
      <BoardDebug v-if="debug" />
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
  </div>
  <DebugTokens
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
import GameBoard from '@board/components/game-board/game-board.vue';
import BoardDebug from '@debug/components/board-debug/board-debug.vue';
import ShowTotalTokens from '@tokens/components/token/components/show-total-tokens/show-total-tokens.vue';
import ProfileSection from '@profiles/layouts/profile-section/profile-section.vue';
import { EBoardColors, EPositionProfiles } from '@board/interfaces/board.enum';
import {
  INITIAL_ACTIONS_MOVE_TOKEN,
  TOKEN_MOVEMENT_INTERVAL_VALUE,
  WAIT_SHOW_MODAL_GAME_OVER,
} from '@game/constants/game.constants';
import type {
  IActionsTurn,
  IGameOver,
  TTotalPlayers,
  TTypeGame,
} from '@game/interfaces/game.interface';
import type { IPlayer, IUser } from '@players/interfaces/user.interface';
import type { TBoardColors } from '@board/interfaces/board.interface';
import type { TDiceValues } from '@dice/interfaces/dice.interface';
import type {
  IActionsMoveToken,
  IListTokens,
  ISelectTokenValues,
  TShowTotalTokens,
} from '@tokens/interfaces/token.interface';
import { getInitialDataPlayers } from '@players/helpers/player.helper';
import {
  getInitialActionsTurnValue,
  getInitialPositionTokens,
  validateDicesForTokens,
  validateMovementToken,
  validateSelectedToken,
  validateSelectTokenRandomly,
} from '@game/helpers/game.helper';
import { getRandomValueDice } from '@common/helpers/random.helper';
import TokenList from '@tokens/components/tokens/token-list/token-list.vue';
import DebugTokens from '@debug/components/debug-tokens/debug-tokens.vue';
import GameOverModal from '@game/components/over/game-over-modal/game-over-modal.vue';
import type { TPlaySoundFunction } from '@sounds/interfaces/sounds.interface';
import { EActionsBoardGame, ETypeGame } from '@game/interfaces/game.enum';
import { OptionsGamePlaySoundSymbol } from '@sounds/constants/sounds.constants';
import { ESounds } from '@sounds/interfaces/sounds.enum';

// TODO: Add types for socket
interface GameProps {
  /** Number of players */
  totalPlayers: TTotalPlayers;
  /** Who starts the game */
  initialTurn: number;
  /** players data */
  users: IUser[];
  /** Game mode */
  typeGame?: TTypeGame;
  /** Board orientation */
  boardColor?: TBoardColors;
  /** Enable debug */
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

<style scoped>
.game-board-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
}
</style>
