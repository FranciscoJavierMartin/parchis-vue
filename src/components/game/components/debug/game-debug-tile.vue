<template>
  <div
    class="game-debug-tile"
    :style="{
      left: `${coordinate.x}px`,
      top: `${coordinate.y}px`,
      height: `${SIZE_TILE}px`,
      width: `${SIZE_TILE}px`,
    }"
  >
    <slot />
  </div>
</template>

<script setup lang="ts">
import type { ICoordinate } from '@/interfaces';
import { SIZE_TILE } from '@/utils/constants';

defineProps<{ coordinate: ICoordinate }>();
</script>

<style scoped>
.game-debug-tile {
  align-items: center;
  display: flex;
  font-size: 11px;
  font-weight: bold;
  justify-content: center;
  position: absolute;
  text-shadow: white 0px 0px 2px;
  z-index: 1;
}
</style>
