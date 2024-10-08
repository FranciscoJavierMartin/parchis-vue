<template>
  <BaseModal :show-modal="showModal" @close="$emit('close')">
    <div class="menu-options-modal">
      <div class="modal-options-header">
        {{ t('options.title') }}
        <button title="Close" class="button menu-options-close" @click="$emit('close')">
          <BaseIcon type="close" />
        </button>
      </div>
      <div class="menu-options-options">
        <!-- prettier-ignore-attribute -->
        <MenuOption
          v-for="key of Object.keys(optionsGame)"
          v-model="optionsGame[key as EOptionsGame]"
          :key="key"
          :label="t(`options.menu.${key}`)"
          :icon="(key.toLowerCase() as TypeIcon)"
        />
        <LanguageSelector />
      </div>
    </div>
  </BaseModal>
</template>

<script setup lang="ts">
import { inject } from 'vue';
import { useI18n } from 'vue-i18n';
import BaseIcon from '@common/components/icons/base-icon.vue';
import MenuOption from '@options/components/menu-option/menu-option.vue';
import LanguageSelector from '@options/components/language-selector/language-selector.vue';
import BaseModal from '@layouts/components/base-modal/base-modal.vue';
import type { TOptionsGame } from '@sounds/interfaces/sounds.interface';
import { OptionsGameStateSymbol } from '@sounds/constants/sounds.constants';
import type { TypeIcon } from '@common/interfaces/icons.interface';
import type { EOptionsGame } from '@options/interfaces/options.enum';

interface MenuOptionsModalProps {
  /** Show modal */
  showModal: boolean;
}

defineProps<MenuOptionsModalProps>();

defineEmits<{
  /** Close modal */
  close: [];
}>();

const optionsGame: TOptionsGame = inject<TOptionsGame>(OptionsGameStateSymbol)!;

const { t } = useI18n();
</script>

<style scoped>
.menu-options-modal {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: calc(var(--base-width) * 0.75);
  background-color: var(--dark-gray);
  border-radius: 5px;
  box-shadow:
    rgba(0, 0, 0, 0.4) 0px 2px 4px,
    rgba(0, 0, 0, 0.3) 0px 7px 13px -3px,
    rgba(0, 0, 0, 0.2) 0px -3px 0px inset;

  .modal-options-header {
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    padding: 18px;
    font-size: 25px;
    font-weight: bold;
    color: white;
    background-color: var(--gray);
    border-radius: 5px;
    box-shadow:
      rgba(0, 0, 0, 0.4) 0px 2px 4px,
      rgba(0, 0, 0, 0.3) 0px 7px 13px -3px,
      rgba(0, 0, 0, 0.2) 0px -3px 0px inset;

    .menu-options-close {
      position: absolute;
      right: 10px;
      display: flex;
      align-items: center;
      justify-content: center;
      width: 35px;
      height: 35px;
      color: white;
      background-color: #a7051d;
      border-radius: 5px;

      .icon-wrapper {
        width: 60%;
        height: 60%;
        transform: translateY(-2px);
      }

      &:active .icon-wrapper {
        transform: translateY(0);
      }
    }
  }

  .menu-options-options {
    width: 100%;
    padding: 20px;
  }
}
</style>
