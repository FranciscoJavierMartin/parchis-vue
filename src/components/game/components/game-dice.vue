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
.game-dice{

}
</style>
