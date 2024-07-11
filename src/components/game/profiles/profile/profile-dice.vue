<template>
  <div class="game-profile-dice" :class="{ hide: !showDice }">Hello</div>
</template>

<script setup lang="ts">
import type { TDiceValues } from '@/interfaces';

interface ProfileDiceProps {
  disabledDice: boolean;
  showDice: boolean;
  value: 0 | TDiceValues;
  diceRollNumber: number;
  // handleDoneDice: () => void;
  // handleSelectDice: () => void;
}

withDefaults(defineProps<ProfileDiceProps>(), {
  disabledDice: false,
  showDice: false,
  value: 0,
  diceRollNumber: 0,
});
</script>

<style scoped>
.game-profile-dice {
  animation: bounceIn 1s both;
  position: absolute;
  width: 60px;
  height: 60px;
  left: 62px;
  top: -5px;
  border-radius: 8px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #00487f;
  box-shadow:
    rgba(0, 0, 0, 0.4) 0px 2px 4px,
    rgba(0, 0, 0, 0.3) 0px 7px 13px -3px,
    rgba(0, 0, 0, 0.2) 0px -3px 0px inset;

  &::after {
    border-style: solid;
    border-width: 10px;
    content: '';
    height: 0;
    position: absolute;
    width: 0;
    border-color: #00487f transparent transparent transparent;
    transform: rotate(90deg);
    left: -30%;
    top: 35%;
  }

  &.hide {
    animation: bounceOut 0.6s both;
  }
}
</style>
