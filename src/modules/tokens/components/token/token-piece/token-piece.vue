<template>
  <!-- TODO: Check if color can be received in lowercase -->
  <div
    class="game-token-piece"
    :class="color.toLowerCase()"
    :style="{ width: 'var(--size-tile)', height: 'var(--size-tile)', ...(style as CSSProperties) }"
  >
    <span
      v-if="debug"
      :style="{
        width: 'var(--size-tile)',
        height: 'var(--size-tile)',
      }"
    >
      {{ index }}
    </span>
  </div>
</template>

<script setup lang="ts">
import type { CSSProperties, StyleValue } from 'vue';
import type { TColors } from '@board/interfaces/board.interface';

interface PieceProps {
  /** Token color */
  color: TColors;
  /** Additional styles */
  style?: StyleValue;
  /** Token index (for debug) */
  index?: number;
  /** Enable debug */
  debug?: boolean;
}

withDefaults(defineProps<PieceProps>(), {
  style: {} as unknown as () => CSSProperties,
  index: 0,
  debug: false,
});
</script>

<style scoped>
.game-token-piece {
  position: absolute;
  top: 0;
  left: 0;
  z-index: 2;
  pointer-events: none;
  border-radius: 50%;
  box-shadow:
    rgba(0, 0, 0, 0.4) 0px 2px 4px,
    rgba(0, 0, 0, 0.3) 0px 7px 13px -3px,
    rgba(0, 0, 0, 0.2) 0px -3px 0px inset,
    rgba(6, 24, 44, 0.4) 0px 0px 0px 1px,
    rgba(6, 24, 44, 0.65) 0px 4px 4px -1px,
    rgba(255, 255, 255, 0.08) 0px 1px 0px inset;
  transition: all 150ms ease;
  /* To ensure re render in Safari */
  transform: translateZ(0);

  &::before {
    position: absolute;
    top: 13%;
    left: 18%;
    width: 65%;
    height: 60%;
    content: '';
    background-color: white;
    border-radius: 50%;
    box-shadow:
      rgba(0, 0, 0, 0.16) 0px 3px 6px,
      rgba(0, 0, 0, 0.23) 0px 3px 6px;
  }

  &::after {
    position: absolute;
    top: 15%;
    left: 25%;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 50%;
    height: 50%;
    font-size: 12px;
    content: '\2605';
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
    position: absolute;
    top: -20px;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: bold;
    color: white;
    background: black;
    border-radius: 10px;
    opacity: 0.7;
  }
}
</style>
