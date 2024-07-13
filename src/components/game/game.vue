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
          <GameToken
            color="RED"
            :coordinate="
              POSITION_TILES[POSITION_ELEMENTS_BOARD.BOTTOM_LEFT.startTileIndex].coordinate
            "
            type-tile="JAIL"
            :index="0"
            :dice-available="[]"
            :total-tokens="1"
            :position="1"
            :enable-tooltip="false"
            :is-moving="false"
            :animated="false"
            :position-tile="1"
            :can-select-token="true"
            :dice-list="[]"
            :handle-selected-token="handleSelectedToken"
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
    </template>
  </PageWrapper>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import PageWrapper from '@/layout/page-wrapper.vue';
import GameBoard from '@/components/game/components/game-board.vue';
import GameToken from '@/components/game/components/token/game-token.vue';
import GameDebug from '@/components/game/components/debug/game-debug.vue';
import ShowTotalTokens from '@/components/game/components/token/components/total-tokens/show-total-tokens.vue';
import BoardWrapper from '@/components/game/components/board-wrapper.vue';
import ProfileSection from '@/components/game/profiles/profile-section.vue';
import { POSITION_ELEMENTS_BOARD, POSITION_TILES } from '@/utils/positions-board';
import { EBoardColors, EPositionProfiles } from '@/constants/board';
import { ETypeGame } from '@/constants/game';
import type { IActionsTurn, TTotalPlayers, TTypeGame } from '@/interfaces/game';
import type { IPlayer, IUser } from '@/interfaces/user';
import type { TBoardColors } from '@/interfaces/board';
import type { TDiceValues } from '@/interfaces/dice';
import type { ISelectTokenValues } from '@/interfaces/token';
import { getInitialDataPlayers } from '@/helpers/player';
import { getInitialActionsTurnValue } from '@/helpers/game';
import { getRandomValueDice } from '@/helpers/random';

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

function handleSelectedToken(selectedTokenValues: ISelectTokenValues) {
  console.log('selectedTokenValues', selectedTokenValues);
}

function handleTimer(ends: boolean = false): void {}

function handleSelectDice(diceValue?: TDiceValues, isActionSocket: boolean = false): void {
  actionsTurn.value = getRandomValueDice(actionsTurn.value, diceValue);
}

function handleDoneDice(isActionSocket: boolean = false): void {}

function handleMuteChat(playerIndex: number): void {}
</script>
