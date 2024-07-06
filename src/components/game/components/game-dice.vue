<template>
  <div
    class="game-dice"
    :class="[`dice-${value}`, { animate }]"
    :style="{ width: `${size}px`, height: `${size}px` }"
  />
</template>

<script setup lang="ts">
import type { TDiceValues } from '@/interfaces';

interface DiceProps {
  value: TDiceValues;
  size?: number;
  animate?: boolean;
}

withDefaults(defineProps<DiceProps>(), { size: 30, animate: false });
</script>

<style scoped>
.game-dice {
  --point: radial-gradient(circle, black 35%, rgba(255, 255, 255, 0) 50%);

  background-color: white;
  border-radius: 2px;
  position: relative;
  box-shadow:
    rgba(0, 0, 0, 0.4) 0px 2px 4px,
    rgba(0, 0, 0, 0.3) 0px 7px 13px -3px,
    rgba(0, 0, 0, 0.2) 0px -1px 0px inset;

  &::after {
    background-repeat: no-repeat;
    background-size: 30% 30%;
    content: '';
    filter: drop-shadow(0 0 1px black);
    height: 100%;
    left: 0;
    overflow: hidden;
    position: absolute;
    top: 0;
    width: 100%;
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
      90% 10%,
      10% 90%,
      90% 90%;
  }

  &.dice-5::after {
    background-image: var(--point), var(--point), var(--point), var(--point), var(--point);
    background-position:
      10% 10%,
      90% 10%,
      50% 50%,
      10% 90%,
      90% 90%;
  }
}
</style>
