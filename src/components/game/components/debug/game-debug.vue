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
</template>

<script setup lang="ts">
import GameDebugTile from '@/components/game/components/debug/game-debug-tile.vue';
import { POSITION_ELEMENTS_BOARD } from '@/utils/positions-board';
</script>
