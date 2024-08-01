<template>
  <template v-for="[key, data] in Object.entries(POSITION_ELEMENTS_BOARD)" :key="key">
    <DebugTile
      v-for="position in data.exitTiles"
      :key="position.index"
      :coordinate="position.coordinate"
    >
      {{ position.index }}
    </DebugTile>
    <DebugTile
      v-for="position in data.startPositions"
      :key="position.index"
      :coordinate="position.coordinate"
      inverted-color
    >
      {{ position.index }}
    </DebugTile>
    <DebugTile
      v-for="position in data.finalPositions"
      :key="position.index"
      :coordinate="position.coordinate"
    >
      {{ position.index }}
    </DebugTile>
  </template>
  <DebugTile
    v-for="position in POSITION_TILES"
    :key="position.index"
    :coordinate="position.coordinate"
  >
    {{ position.index }}
  </DebugTile>
</template>

<script setup lang="ts">
import DebugTile from '@debug/components/debug-tile/debug-tile.vue';
import { POSITION_ELEMENTS_BOARD, POSITION_TILES } from '@board/helpers/positions-board.helper';
</script>
