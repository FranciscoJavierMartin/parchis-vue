<template>
  <div
    class="game-token"
    :class="{ moving: isMoving, animated }"
    :style="{
      height: 'var(--size-tile)',
      left: `${coordinate.x}px`,
      top: `${coordinate.y}px`,
      width: 'var(--size-tile)',
      zIndex: 2,
    }"
  >
    <GamePiece :color="color" />
  </div>
</template>

<script setup lang="ts">
import type { IDiceList, IToken } from '@/interfaces';
import { EColors, EtypeTile } from '@/utils/constants';
import GamePiece from '@/components/game/components/token/components/piece/game-piece.vue';

// TODO: Add handleSelectToken
interface TokenProps extends IToken {
  diceList?: IDiceList[]; // TODO: Remove optional value
  isDisabledUI?: boolean;
  debug?: boolean;
}

withDefaults(defineProps<TokenProps>(), {
  color: EColors.RED,
  typeTile: EtypeTile.NORMAL,
  index: 0,
  diceAvailable: [],
  totalTokens: 4,
  position: 1,
  enableTooltip: false,
  isMoving: false,
  animated: false,
  canSelectToken: true,
  diceList: [],
  isDisabledUI: false,
  debug: true,
});
</script>

<style scoped>
.game-token {
  position: absolute;

  &.animated {
    transition: all 100ms ease;
  }

  &.moving {
    animation: heartBeat 1s infinite;
  }
}

@keyframes heartBeat {
  0% {
    transform: scale(1);
  }

  14% {
    transform: scale(1.3);
  }

  28% {
    transform: scale(1);
  }

  42% {
    transform: scale(1.3);
  }

  70% {
    transform: scale(1);
  }
}
</style>
