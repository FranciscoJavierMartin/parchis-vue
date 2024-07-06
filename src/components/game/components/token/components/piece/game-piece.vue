<template>
  <!-- TODO: Check if color can be received in lowercase -->
  <div
    class="game-token-piece"
    :class="color.toLowerCase()"
    :style="{ width: 'var(--size-tile)', height: 'var(--size-tile)', ...(style as CSSProperties) }"
  >
    <span v-if="debug" :style="{ width: 'var(--size-tile)', height: 'var(--size-tile)' }"
      >{{ index }}
    </span>
  </div>
</template>

<script setup lang="ts">
import type { TColors } from '@/interfaces';
import type { CSSProperties, StyleValue } from 'vue';

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
  border-radius: 50%;
  left: 0;
  pointer-events: none;
  position: absolute;
  top: 0;
  transition: all 150ms ease;
  z-index: 2;
  /* To ensure re render in Safari */
  transform: translateZ(0);
  box-shadow:
    rgba(0, 0, 0, 0.4) 0px 2px 4px,
    rgba(0, 0, 0, 0.3) 0px 7px 13px -3px,
    rgba(0, 0, 0, 0.2) 0px -3px 0px inset,
    rgba(6, 24, 44, 0.4) 0px 0px 0px 1px,
    rgba(6, 24, 44, 0.65) 0px 4px 4px -1px,
    rgba(255, 255, 255, 0.08) 0px 1px 0px inset;

  &::before {
    content: '';
    border-radius: 50%;
    background-color: white;
    height: 60%;
    left: 18%;
    position: absolute;
    top: 13%;
    width: 65%;
    box-shadow:
      rgba(0, 0, 0, 0.16) 0px 3px 6px,
      rgba(0, 0, 0, 0.23) 0px 3px 6px;
  }

  &::after {
    align-items: center;
    content: '\2605';
    display: flex;
    font-size: 12px;
    height: 50%;
    justify-content: center;
    left: 25%;
    position: absolute;
    top: 15%;
    width: 50%;
  }

  &.red {
    background-color: var(--game-red);

    &::after {
      color: var(--game-red);
    }
  }

  &.blue {
    background-color: var(--game-blue);

    &::after {
      color: var(--game-blue);
    }
  }

  &.green {
    background-color: var(--game-green);

    &::after {
      color: var(--game-green);
    }
  }

  &.yellow {
    background-color: var(--game-yellow);

    &::after {
      color: var(--game-yellow);
    }
  }

  /* Styles to show token index. Only for debug */
  span {
    align-items: center;
    background: black;
    border-radius: 10px;
    color: white;
    display: flex;
    font-weight: bold;
    justify-content: center;
    opacity: 0.7;
    position: absolute;
    top: -20px;
  }
}
</style>
