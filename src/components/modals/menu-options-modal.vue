<template>
  <BaseModal>
    <div class="menu-options-modal">
      <div class="modal-options-header">
        Options
        <button title="Close" class="button menu-options-close" @click="$emit('close')">
          <XMarkIcon :stroke-width="3.5" />
        </button>
      </div>
      <div class="menu-options-options">
        <MenuOption
          v-for="(option, index) of options"
          :key="option.label"
          v-bind="option"
          v-model="options[index].checked"
        />
      </div>
    </div>
  </BaseModal>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import BaseModal from '@/components/base/base-modal.vue';
import XMarkIcon from '@/components/icons/x-mark-icon.vue';
import MenuOption from '@/components/options/menu-option.vue';

defineEmits<{ close: [] }>();

const options = ref([
  {
    label: 'Sound',
    icon: 'sound',
    checked: false,
  },
  {
    label: 'Music',
    icon: 'music',
    checked: false,
  },
]);
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

      &:deep(svg) {
        width: 60%;
        height: 60%;
        transform: translateY(-2px);
      }

      &:active:deep(svg) {
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
