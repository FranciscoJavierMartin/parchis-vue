<template>
  <div class="select-token-color-tooltip glass-effect">
    <button
      v-for="buttonColor in EColors"
      type="button"
      :key="buttonColor"
      :class="[buttonColor.toLowerCase(), { selected: buttonColor === color }]"
      @click="updateColor(buttonColor)"
    />
  </div>
</template>

<script setup lang="ts">
import { EColors } from '@board/interfaces/board.enum';
import type { TColors } from '@board/interfaces/board.interface';

const color = defineModel<TColors>();

//#region FUNCTIONS
function updateColor(buttonColor: EColors): void {
  console.log(buttonColor);
  color.value = buttonColor;
}
//#endregion
</script>

<style scoped>
.select-token-color-tooltip {
  position: absolute;
  top: -45px;
  left: -35px;
  z-index: 2;
  display: flex;
  gap: 5px;
  padding: 5px;
  border-radius: 5px;
  animation: bounceIn 0.5s both;

  &::after {
    position: absolute;
    top: 100%;
    left: 30%;
    width: 0;
    height: 0;
    content: '';
    border-color: rgba(255, 255, 255, 0.2) transparent transparent transparent;
    border-style: solid;
    border-width: 10px;
  }

  button {
    width: 30px;
    height: 30px;
    cursor: pointer;
    border: none;
    border-radius: 5px;

    &.red {
      background-color: var(--game-red);
    }

    &.blue {
      background-color: var(--game-blue);
    }

    &.green {
      background-color: var(--game-green);
    }

    &.yellow {
      background-color: var(--game-yellow);
    }

    &.selected {
      border: 3px solid white;
      box-shadow:
        rgba(0, 0, 0, 0.25) 0px 0.0625em 0.0625em,
        rgba(0, 0, 0, 0.25) 0px 0.125em 0.5em,
        rgba(255, 255, 255, 0.1) 0px 0px 0px 1px inset;
    }
  }
}
</style>
