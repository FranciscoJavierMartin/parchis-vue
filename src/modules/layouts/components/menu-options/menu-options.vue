<template>
  <button class="button blue menu-options-button" @click="handleShowOptions">
    <BaseIcon type="gear" />
  </button>
  <MenuOptionsModal v-if="isOpen" @close="closeModal" />
</template>

<script setup lang="ts">
import { ref, type Ref } from 'vue';
import MenuOptionsModal from '@options/components/menu-options-modal/menu-options-modal.vue';
import BaseIcon from '@common/components/icons/base-icon.vue';

const isOpen: Ref<boolean> = ref<boolean>(false);

function handleShowOptions(): void {
  isOpen.value = true;
}

function closeModal(): void {
  isOpen.value = false;
}
</script>

<style scoped>
.menu-options-button {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 35px;
  height: 35px;
  border-radius: 5px;

  .icon-wrapper {
    width: 50%;
  }
}
</style>
