<template>
  <template v-for="[key, data] in Object.entries(POSITION_ELEMENTS_BOARD)" :key="key">
    <GameDebugTile
      v-for="position in data.exitTiles"
      :key="position.index"
      :coordinate="position.coordinate"
    >
      {{ position.index }}
    </GameDebugTile>
    <GameDebugTile
      v-for="position in data.startPositions"
      :key="position.index"
      :coordinate="position.coordinate"
      inverted-color
    >
      {{ position.index }}
    </GameDebugTile>
    <GameDebugTile
      v-for="position in data.finalPositions"
      :key="position.index"
      :coordinate="position.coordinate"
    >
      {{ position.index }}
    </GameDebugTile>
  </template>
  <GameDebugTile
    v-for="position in POSITION_TILES"
    :key="position.index"
    :coordinate="position.coordinate"
  >
    {{ position.index }}
  </GameDebugTile>
</template>

<script setup lang="ts">
import GameDebugTile from '@/modules/debug/components/debug-tile/debug-tile.vue';
import {
  POSITION_ELEMENTS_BOARD,
  POSITION_TILES,
} from '@/modules/board/helpers/positions-board.helper';
</script>
