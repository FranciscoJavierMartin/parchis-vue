<template>
  <div class="game-total-tokens" :style="styles">
    <div class="game-total-tokens-value">{{ value }}</div>
  </div>
</template>

<script setup lang="ts">
import { POSITION_TILES } from '@/utils/positions-board';
import { type CSSProperties, computed } from 'vue';

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
  animation: bounceIn 1s both;
  height: var(--size-tile);
  position: absolute;
  width: var(--size-tile);
  z-index: 6;

  .game-total-tokens-value {
    align-items: center;
    background-color: #dfdfdf;
    border-radius: 50%;
    box-shadow:
      rgba(0, 0, 0, 0.16) 1px 7px 3px,
      rgb(51, 51, 51) 0px 0px 0px 1px;
    display: flex;
    filter: drop-shadow(0px -2px 2px black);
    font-size: 12px;
    font-weight: bold;
    height: 60%;
    justify-content: center;
    position: relative;
    transform: translate(35%, 120%);
    width: 60%;

    &::after {
      border-color: #dfdfdf transparent transparent transparent;
      border-style: solid;
      border-width: 6px;
      content: '';
      height: 0;
      left: 11%;
      position: absolute;
      top: -58%;
      transform: scale(-1);
      width: 0;
    }
  }
}
</style>
