<template>
  <div
    class="dice"
    :class="[`roll-${diceValue}`, isRolling ? 'animation-rolling' : 'animation-none']"
    :style="{
      '--size-side': `${size}px`,
      '--random-rotation-degress': `${randomRotationDegrees}deg`,
    }"
  >
    <!-- prettier-ignore-attribute -->
    <DiceFace v-for="i in 6" :key="i" :value="(i as TDiceValues)" :size="size" class="face" />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import DiceFace from '@/components/game/components/dice/dice-face.vue';
import type { TDiceValues } from '@/interfaces';

defineProps<{ size: number }>();

const isRolling = ref<boolean>(false);
const diceValue = ref<number>(1);
const randomRotationDegrees = ref<number>(0);

// FIXME: Use isRolling. May with setTimeout
function rollDice(): void {
  const random = Math.floor(Math.random() * 10);
  if (random >= 1 && random <= 6) {
    randomRotationDegrees.value = Math.floor(100 + Math.random() * 400);
    diceValue.value = random;
  } else {
    rollDice();
  }
}

defineExpose({
  rollDice,
});
</script>

<style scoped>
.dice {
  --half-size: calc(var(--size-side) / 2);
  transform-style: preserve-3d;
  width: var(--size-side);
  height: var(--size-side);
  position: relative;
  transition: 1s ease;

  &.animation-rolling {
    animation: rolling 1s;
  }

  &.animation-none {
    animation: none;
  }

  &.roll-1 {
    transform: rotate(0deg);
  }

  &.roll-2 {
    transform: rotateX(-90deg) rotateY(0deg);
  }

  &.roll-3 {
    transform: rotateX(0deg) rotateY(90deg);
  }

  &.roll-4 {
    transform: rotateX(0deg) rotateY(-90deg);
  }

  &.roll-5 {
    transform: rotateX(90deg) rotateY(0deg);
  }

  &.roll-6 {
    transform: rotateX(180deg) rotateY(0deg);
  }

  div:nth-child(1) {
    transform: translateZ(var(--half-size));
  }

  div:nth-child(2) {
    transform: rotateX(90deg) translateZ(var(--half-size));
  }

  div:nth-child(3) {
    transform: rotateY(-90deg) translateZ(var(--half-size));
  }

  div:nth-child(4) {
    transform: rotateY(90deg) translateZ(var(--half-size));
  }

  div:nth-child(5) {
    transform: rotateX(-90deg) translateZ(var(--half-size));
  }

  div:nth-child(6) {
    transform: rotateX(180deg) translateZ(var(--half-size));
  }

  .face {
    transform-style: preserve-3d;
    position: absolute;
  }
}

@keyframes rolling {
  50% {
    transform: rotateX(var(--random-rotation-degress)) rotateY(var(--random-rotation-degress));
  }
}
</style>
