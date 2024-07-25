<template>
  <div class="game-offline-token-wrapper">
    <button
      :disabled="disabled"
      type="button"
      class="game-offline-token-color"
      @click="handleShowTooltip"
    >
      <TokenPiece :color="color" />
    </button>
    <SelectTokenColorTooltip
      v-if="showTooltip"
      v-model="color"
      v-click-outside="handleClickOutside"
    />
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import type { TColors } from '@/interfaces/board';
import TokenPiece from '@/components/game/token/components/piece/token-piece.vue';
import SelectTokenColorTooltip from '@/components/config/select-token-color-tooltip.vue';
import { vClickOutside } from '@/directives/click-outside';

interface SelectTokenColorProps {
  disabled: boolean;
  // color: TColors;
}

defineProps<SelectTokenColorProps>();

// defineEmits<{
//   changeColor: [color: TColors];
// }>();

const showTooltip = ref<boolean>(false);

const color = defineModel<TColors>({ required: true });

function handleShowTooltip(): void {
  showTooltip.value = !showTooltip.value;
}

function handleClickOutside(): void {
  showTooltip.value = false;
}
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
