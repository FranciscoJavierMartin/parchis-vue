<!-- eslint-disable vue/multi-word-component-names -->
<template>
  <PageWrapper>
    <template #default>
      <GameBoard>
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
      </GameBoard>
    </template>
  </PageWrapper>
</template>

<script setup lang="ts">
import PageWrapper from '@/layout/page-wrapper.vue';
import GameBoard from '@/components/game/components/game-board.vue';
import GameToken from '@/components/game/components/token/game-token.vue';
import GameDebug from '@/components/game/components/debug/game-debug.vue';
import { POSITION_ELEMENTS_BOARD, POSITION_TILES } from '@/utils/positions-board';
import type { ISelectTokenValues } from '@/interfaces';

interface GameProps {
  debug?: boolean;
}

withDefaults(defineProps<GameProps>(), { debug: false });

function handleSelectedToken(selectedTokenValues: ISelectTokenValues) {
  console.log('selectedTokenValues', selectedTokenValues);
}
</script>
