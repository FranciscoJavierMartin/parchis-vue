<template>
  <div
    class="dice-3d"
    :class="[`roll-${diceValue}`, isRolling ? 'animation-rolling' : 'animation-none']"
    :style="{
      '--size-side': `${size}px`,
      '--random-rotation-degress': `${randomRotationDegrees}deg`,
      '--animation-duration': `${rollTime}s`,
    }"
  >
    <!-- prettier-ignore-attribute -->
    <DiceFace v-for="i in 6" :key="i" :value="(i as TDiceValues)" :size="size" class="face" />
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import DiceFace from '@dice/components/dice-face/dice-face.vue';
import type { TDiceValues } from '@dice/interfaces/dice.interface';
import { getRandomNumber } from '@common/helpers/random.helper';
import { ROLL_TIME_VALUE } from '@game/constants/game.constants';

interface Dice3dProps {
  /** Side dice size */
  size: number;
  /** Roll time */
  rollTime?: number;
}

const props = withDefaults(defineProps<Dice3dProps>(), {
  rollTime: ROLL_TIME_VALUE,
});
const emit = defineEmits<{
  /** When roll is done */
  rollDone: [];
}>();

//#region REFS
const isRolling = ref<boolean>(false);
const diceValue = ref<TDiceValues>(1);
const randomRotationDegrees = ref<number>(0);
//#endregion

//#region FUNCTIONS
/**
 * Roll dice animation
 * @param value dice value to be setted
 */
function rollDice(value: TDiceValues): void {
  randomRotationDegrees.value = getRandomNumber(100, 500);
  isRolling.value = true;
  diceValue.value = value;

  setTimeout(() => {
    isRolling.value = false;
    emit('rollDone');
  }, props.rollTime * 1000);
}
//#endregion

defineExpose({
  /** Function to roll dice */
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
    animation: rolling var(--animation-duration);
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
