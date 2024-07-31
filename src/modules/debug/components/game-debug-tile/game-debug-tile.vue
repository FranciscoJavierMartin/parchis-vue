<template>
  <div
    class="game-debug-tile"
    :style="{
      left: `${coordinate.x}px`,
      top: `${coordinate.y}px`,
      height: `${SIZE_TILE}px`,
      width: `${SIZE_TILE}px`,
      color: invertedColor ? 'white' : 'black',
    }"
  >
    <slot />
  </div>
</template>

<script setup lang="ts">
import { SIZE_TILE } from '@/modules/board/constants/sizes';
import type { ICoordinate } from '@/modules/board/interfaces/board';

withDefaults(defineProps<{ coordinate: ICoordinate; invertedColor?: boolean }>(), {
  invertedColor: false,
});
</script>

<style scoped>
.game-debug-tile {
  position: absolute;
  z-index: 1;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 11px;
  font-weight: bold;
  text-shadow: white 0px 0px 2px;
}
</style>
