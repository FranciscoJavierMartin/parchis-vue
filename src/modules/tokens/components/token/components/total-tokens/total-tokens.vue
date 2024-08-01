<template>
  <div class="game-total-tokens" :style="styles">
    <div class="game-total-tokens-value">{{ value }}</div>
  </div>
</template>

<script setup lang="ts">
import { type CSSProperties, computed } from 'vue';
import { POSITION_TILES } from '@board/helpers/positions-board.helper';

interface TotalTokensProps {
  indexPosition: number;
  value: number;
}
const props = withDefaults(defineProps<TotalTokensProps>(), {
  indexPosition: 0,
  value: 0,
});

const styles = computed<CSSProperties>(() => {
  // Index position given its index
  const { x, y } = POSITION_TILES[props.indexPosition].coordinate;
  return {
    left: `${x}px`,
    top: `${y}px`,
  };
});
</script>

<style scoped>
.game-total-tokens {
  position: absolute;
  z-index: 6;
  width: var(--size-tile);
  height: var(--size-tile);
  animation: bounceIn 1s both;

  .game-total-tokens-value {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 60%;
    height: 60%;
    font-size: 12px;
    font-weight: bold;
    background-color: #dfdfdf;
    filter: drop-shadow(0px -2px 2px black);
    border-radius: 50%;
    box-shadow:
      rgba(0, 0, 0, 0.16) 1px 7px 3px,
      rgb(51, 51, 51) 0px 0px 0px 1px;
    transform: translate(35%, 120%);

    &::after {
      position: absolute;
      top: -58%;
      left: 11%;
      width: 0;
      height: 0;
      content: '';
      border-color: #dfdfdf transparent transparent transparent;
      border-style: solid;
      border-width: 6px;
      transform: scale(-1);
    }
  }
}
</style>
