<template>
  <div class="game-offline-token-wrapper">
    <button
      type="button"
      :disabled="disabled"
      class="game-offline-token-color"
      :aria-label="t('players.input.selectColor')"
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
import { useI18n } from 'vue-i18n';
import type { TColors } from '@board/interfaces/board.interface';
import TokenPiece from '@tokens/components/token/token-piece/token-piece.vue';
import SelectTokenColorTooltip from '@players/components/select-token-color-tooltip/select-token-color-tooltip.vue';
import { vClickOutside } from '@common/directives/click-outside/click-outside.directive';

interface SelectTokenColorProps {
  /** Disable input */
  disabled: boolean;
}

defineProps<SelectTokenColorProps>();
const { t } = useI18n();

//#region REFS
const showTooltip = ref<boolean>(false);
//#endregion

const color = defineModel<TColors>({ required: true });

//#region FUNCTIONS
function handleShowTooltip(): void {
  showTooltip.value = !showTooltip.value;
}

function handleClickOutside(): void {
  showTooltip.value = false;
}
//#endregion
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
