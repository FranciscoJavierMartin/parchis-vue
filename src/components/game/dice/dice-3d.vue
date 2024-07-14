<template>
  <div
    class="dice-3d"
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
import DiceFace from '@/components/game/dice/dice-face.vue';
import type { TDiceValues } from '@/interfaces/dice';
import { getRandomNumber } from '@/helpers/random';

defineProps<{ size: number }>();
const emit = defineEmits(['rollDone']);

const isRolling = ref<boolean>(false);
const diceValue = ref<TDiceValues>(1);
const randomRotationDegrees = ref<number>(0);

function rollDice(value: TDiceValues): void {
  randomRotationDegrees.value = getRandomNumber(100, 500);
  isRolling.value = true;

  setTimeout(() => {
    diceValue.value = value;
    isRolling.value = false;
    emit('rollDone');
  }, 2050);
}

defineExpose({
  rollDice,
});
</script>

<style scoped>
.dice-3d {
  --half-size: calc(var(--size-side) / 2);
  position: relative;
  z-index: 0;
  width: var(--size-side);
  height: var(--size-side);
  transition: 1s ease;
  transform-style: preserve-3d;

  &.animation-rolling {
    animation: rolling 2s;
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
