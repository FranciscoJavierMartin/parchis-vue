<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <PageWrapper>
    <template #default>
      <GameBoard>
        <GameToken
          v-for="i in totalTokens"
          :key="i"
          color="RED"
          :coordinate="
            POSITION_TILES[POSITION_ELEMENTS_BOARD.BOTTOM_LEFT.startTileIndex].coordinate
          "
          type-tile="JAIL"
          :index="i - 1"
          :dice-available="[]"
          :total-tokens="totalTokens"
          :position="i"
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

        <ShowTotalTokens :total-tokens="{ 0: 5, 4: 8 }" />
      </GameBoard>
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
import { POSITION_ELEMENTS_BOARD, POSITION_TILES } from '@/utils/positions-board';
import type {
  IPlayer,
  ISelectTokenValues,
  IUser,
  TBoardColors,
  TTotalPlayers,
  TTypeGame,
} from '@/interfaces';

// TODO: Add types for socket
interface GameProps {
  totalPlayers: TTotalPlayers;
  initialTurn: number;
  users: IUser[];
  typeGame?: TTypeGame;
  boardColor?: TBoardColors;
  debug?: boolean;
}

withDefaults(defineProps<GameProps>(), { debug: false });

const players = ref<IPlayer[]>([]);

const totalTokens: number = 5;
function handleSelectedToken(selectedTokenValues: ISelectTokenValues) {
  console.log('selectedTokenValues', selectedTokenValues);
}
</script>
