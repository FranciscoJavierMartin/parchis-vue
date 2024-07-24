<template>
  <div class="game-offline-token-wrapper">
    <button :disabled="disabled" type="button" class="game-offline-token-color">
      <TokenPiece :color="color" />
    </button>
  </div>
</template>

<script lang="ts" setup>
import type { TColors } from '@/interfaces/board';
import TokenPiece from '@/components/game/token/components/piece/token-piece.vue';

interface SelectTokenColorProps {
  disabled: boolean;
  color: TColors;
}

defineProps<SelectTokenColorProps>();

defineEmits<{
  changeColor: [color: TColors];
}>();
</script>

<style scoped>
.game-offline-token-wrapper {
  position: relative;
  width: 35px;
  height: 35px;

  .game-offline-token-color {
    width: 100%;
    height: 100%;
    cursor: pointer;
    background-color: transparent;
    border: none;

    &:deep(.game-token-piece) {
      top: 15%;
      left: 15%;
    }

    &:disabled {
      pointer-events: none;
      cursor: auto;
      opacity: 0.5;

      &:deep(.game-token-piece) {
        filter: grayscale(1);
        opacity: 0.5;
      }
    }
  }
}
</style>
