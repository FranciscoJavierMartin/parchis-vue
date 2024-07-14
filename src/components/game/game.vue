<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <PageWrapper>
    <template #default>
      <BoardWrapper>
        <!-- prettier-ignore-attribute -->
        <ProfileSection
          :base-position="EPositionProfiles.TOP"
          :profile-handlers="{ handleDoneDice, handleMuteChat, handleSelectDice, handleTimer }"
          :players="players"
          :total-players="(players.length as TTotalPlayers)"
          :current-turn="currentTurn"
          :actions-turn="actionsTurn"
        />
        <!-- prettier-ignore-attribute -->
        <GameBoard :boardColor="(boardColor as EBoardColors)">
          <TokenList
            :dice-list="[]"
            :handle-selected-token="handleSelectedToken"
            :list-token="listTokens"
            :debug="debug"
          />
          <GameDebug v-if="debug" />
          <ShowTotalTokens :total-tokens="{}" />
        </GameBoard>
        <!-- prettier-ignore-attribute -->
        <ProfileSection
          :base-position="EPositionProfiles.BOTTOM"
          :profile-handlers="{ handleDoneDice, handleMuteChat, handleSelectDice, handleTimer }"
          :players="players"
          :total-players="(players.length as TTotalPlayers)"
          :current-turn="currentTurn"
          :actions-turn="actionsTurn"
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
        :set-list-tokens="() => {}"
      />
    </template>
  </PageWrapper>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import PageWrapper from '@/layout/page-wrapper.vue';
import GameBoard from '@/components/game/board/game-board.vue';
import GameDebug from '@/components/game/debug/game-debug.vue';
import ShowTotalTokens from '@/components/game/token/components/total-tokens/show-total-tokens.vue';
import BoardWrapper from '@/components/game/board/board-wrapper.vue';
import ProfileSection from '@/components/game/profiles/profile-section.vue';
import { EBoardColors, EPositionProfiles } from '@/constants/board';
import { ETypeGame } from '@/constants/game';
import type { IActionsTurn, TTotalPlayers, TTypeGame } from '@/interfaces/game';
import type { IPlayer, IUser } from '@/interfaces/user';
import type { TBoardColors } from '@/interfaces/board';
import type { TDiceValues } from '@/interfaces/dice';
import type { IListTokens, ISelectTokenValues } from '@/interfaces/token';
import { getInitialDataPlayers } from '@/helpers/player';
import { getInitialActionsTurnValue, getInitialPositionTokens } from '@/helpers/game';
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
const listTokens = ref<IListTokens[]>(
  getInitialPositionTokens(props.boardColor, props.totalPlayers, players.value),
);

function handleSelectedToken(selectedTokenValues: ISelectTokenValues): void {
  console.log('selectedTokenValues', selectedTokenValues);
}

function handleTimer(ends: boolean = false): void {}

function handleSelectDice(diceValue?: TDiceValues, isActionSocket: boolean = false): void {
  actionsTurn.value = getRandomValueDice(
    actionsTurn.value,
    // TODO: Provisional fix. Fix later
    typeof diceValue !== 'object' ? diceValue : undefined,
  );
}

function handleDoneDice(isActionSocket: boolean = false): void {}

function handleMuteChat(playerIndex: number): void {}
</script>
