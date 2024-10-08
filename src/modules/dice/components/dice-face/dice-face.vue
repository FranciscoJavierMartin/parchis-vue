<template>
  <div
    class="dice-face"
    :class="[`dice-${value}`, { animate, shadow }]"
    :style="{ width: `${size}px`, height: `${size}px` }"
  />
</template>

<script setup lang="ts">
import { DICE_SIZE_TOOLTIP } from '@board/constants/sizes.constants';
import type { TDiceValues } from '@dice/interfaces/dice.interface';

interface DiceProps {
  /** Dice value */
  value: TDiceValues;
  /** Side dice size */
  size?: number;
  /** Animate face */
  animate?: boolean;
  /** Add shadow */
  shadow?: boolean;
}

withDefaults(defineProps<DiceProps>(), { size: DICE_SIZE_TOOLTIP, animate: false, shadow: false });
</script>

<style scoped>
.dice-face {
  --point: radial-gradient(circle, black 35%, rgba(255, 255, 255, 0) 50%);
  position: relative;
  background-color: white;
  border-radius: 2px;

  &.shadow {
    box-shadow:
      rgba(0, 0, 0, 0.4) 0px 2px 4px,
      rgba(0, 0, 0, 0.3) 0px 7px 13px -3px,
      rgba(0, 0, 0, 0.2) 0px -1px 0px inset;
  }

  &.animate {
    animation: bounceIn 1s both;
  }

  &::after {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    overflow: hidden;
    content: '';
    filter: drop-shadow(0 0 1px black);
    background-repeat: no-repeat;
    background-size: 30% 30%;
  }

  &.dice-1::after {
    background-image: var(--point);
    background-position: 50% 50%;
  }

  &.dice-2::after {
    background-image: var(--point), var(--point);
    background-position:
      90% 10%,
      10% 90%;
  }

  &.dice-3::after {
    background-image: var(--point), var(--point), var(--point);
    background-position:
      90% 10%,
      50% 50%,
      10% 90%;
  }

  &.dice-4::after {
    background-image: var(--point), var(--point), var(--point), var(--point);
    background-position:
      10% 10%,
      10% 90%,
      90% 10%,
      90% 90%;
  }

  &.dice-5::after {
    background-image: var(--point), var(--point), var(--point), var(--point), var(--point);
    background-position:
      10% 10%,
      10% 90%,
      50% 50%,
      90% 10%,
      90% 90%;
  }

  &.dice-6::after {
    background-image: var(--point), var(--point), var(--point), var(--point), var(--point),
      var(--point);
    background-position:
      10% 10%,
      10% 50%,
      10% 90%,
      90% 10%,
      90% 50%,
      90% 90%;
  }
}
</style>
