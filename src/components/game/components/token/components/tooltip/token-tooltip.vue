<template>
  <div class="token-tooltip" :class="[color.toLowerCase()]">
    <button v-for="dice in diceAvailable" :key="dice.key" :title="`Dice ${dice.value}`">
      <GameDice :value="dice.value" :size="DICE_SIZE_TOOLTIP" />
    </button>
  </div>
</template>

<script setup lang="ts">
import type { ICoordinate, IDiceList, TColors } from '@/interfaces';
import { EColors, DICE_SIZE_TOOLTIP } from '@/utils/constants';
import GameDice from '@/components/game/components/game-dice.vue';

interface TokenTooltipProps {
  color: TColors;
  coordinate: ICoordinate;
  diceAvailable?: IDiceList[];
  handleTooltipDice: (dice: IDiceList) => void;
}

withDefaults(defineProps<TokenTooltipProps>(), {
  color: EColors.RED,
  coordinate: { x: 0, y: 0 },
  diceAvailable: [],
});
</script>

<style scoped>
.token-tooltip {
  animation: bounceIn 0.5s both;
  border-radius: 5px;
  box-shadow: -2px 4px 14px 0px #090909;
  display: flex;
  gap: 5px;
  padding: 8px;
  position: absolute;
  z-index: 10;

  &.blue {
    background-color: var(--game-blue);
  }

  &.red {
    background-color: var(--game-red);
  }

  &.yellow {
    background-color: var(--game-yellow);
  }

  &.green {
    background-color: var(--game-green);
  }

  button {
    background-color: transparent;
    border: 0;
    cursor: pointer;
    margin: 0;
    padding: 0;
  }
}
</style>
