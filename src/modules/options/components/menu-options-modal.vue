<template>
  <BaseModal>
    <div ref="trapRef" class="menu-options-modal">
      <div class="modal-options-header">
        Options
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
          :label="key"
          :icon="(key.toLowerCase() as TypeIcon)"
        />
      </div>
    </div>
  </BaseModal>
</template>

<script setup lang="ts">
import { inject } from 'vue';
import BaseIcon from '@/modules/common/components/icons/base-icon.vue';
import BaseModal from '@/modules/common/components/base/base-modal/base-modal.vue';
import MenuOption from '@/modules/options/components/menu-option.vue';
import { OptionsGameStateSymbol } from '@/modules/game/constants/game';
import type { TOptionsGame } from '@/modules/sounds/interfaces/sounds';
import type { EOptionsGame } from '@/modules/online/constants/online';
import useFocusTrap from '@/modules/common/composables/use-focus-trap';
import type { TypeIcon } from '@/modules/common/interfaces/icons';

defineEmits<{ close: [] }>();

const { trapRef } = useFocusTrap();

const optionsGame: TOptionsGame = inject<TOptionsGame>(OptionsGameStateSymbol)!;
</script>

<style scoped>
.menu-options-modal {
  display: flex;
  flex-direction: column;
  align-content: center;
  justify-content: center;
  width: 100%;
  background-color: #312938;
  border-radius: 5px;
  box-shadow:
    rgba(0, 0, 0, 0.4) 0px 2px 4px,
    rgba(0, 0, 0, 0.3) 0px 7px 13px -3px,
    rgba(0, 0, 0, 0.2) 0px -3px 0px inset;
  animation: scaleUp 0.5s;

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
    background-color: #4d4658;
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
