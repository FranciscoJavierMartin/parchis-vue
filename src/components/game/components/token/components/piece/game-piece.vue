<template>
  <div
    class="game-token-piece"
    :class="color.toLowerCase()"
    :style="{ width: 'var(--size-tile)', height: 'var(--size-tile)', ...(style as any) }"
  ></div>
</template>

<script setup lang="ts">
import type { TColors } from '@/interfaces';
import type { StyleValue } from 'vue';

interface PieceProps {
  color: TColors;
  style?: StyleValue;
  index?: number;
  debug?: boolean;
}

withDefaults(defineProps<PieceProps>(), {
  style: {} as any,
  index: 0,
  debug: false,
});
</script>

<style scoped>
.game-token-piece {
  transition: all 150ms ease;
  left: 0;
  top: 0;
  position: absolute;
  border-radius: 50%;
  z-index: 2;
  pointer-events: none;
  /* To ensure re render in Safari */
  transform: translateZ(0);
  box-shadow:
    rgba(0, 0, 0, 0.4) 0px 2px 4px,
    rgba(0, 0, 0, 0.3) 0px 7px 13px -3px,
    rgba(0, 0, 0, 0.2) 0px -3px 0px inset,
    rgba(6, 24, 44, 0.4) 0px 0px 0px 1px,
    rgba(6, 24, 44, 0.65) 0px 4px 4px -1px,
    rgba(255, 255, 255, 0.08) 0px 1px 0px inset;

  &.red {
    background-color: var(--game-red);
  }

  &.blue {
    background-color: var(--game-blue);
  }

  &.green {
    background-color: var(--game-green);
  }

  &.yellow {
    background-color: var(--game-yellow);
  }
}
</style>
