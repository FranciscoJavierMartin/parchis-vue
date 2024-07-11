<template>
  <div>Hello</div>
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

<style scoped></style>
