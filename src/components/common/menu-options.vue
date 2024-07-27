<template>
  <button class="button blue menu-options-button" @click="handleShowOptions">
    <GearIcon />
  </button>
  <MenuOptionsModal v-if="isOpen" @close="closeModal" />
</template>

<script setup lang="ts">
import GearIcon from '@/components/icons/gear-icon.vue';
import MenuOptionsModal from '@/components/modals/menu-options-modal.vue';

import { ref, type Ref } from 'vue';

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

  &:deep(svg) {
    width: 50%;
  }
}
</style>
