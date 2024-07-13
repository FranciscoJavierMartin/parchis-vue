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
import { SIZE_TILE } from '@/constants/sizes';
import type { ICoordinate } from '@/interfaces';

defineProps<{ coordinate: ICoordinate }>();
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
