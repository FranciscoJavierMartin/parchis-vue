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

  &.hide {
  }
}
</style>
