<template>
  <button class="button blue menu-options-button" @click="handleShowOptions">
    <BaseIcon type="gear" />
  </button>
  <!-- <MenuOptionsModal v-if="isOpen" @close="closeModal" /> -->
  <CommonModal :show-modal="isOpen" @close="isOpen = false" />
</template>

<script setup lang="ts">
import { ref, type Ref } from 'vue';
import MenuOptionsModal from '@options/components/menu-options-modal/menu-options-modal.vue';
import CommonModal from '@layouts/components/common-modal/common-modal.vue';
import BaseIcon from '@common/components/icons/base-icon.vue';

//#region REFS
const isOpen: Ref<boolean> = ref<boolean>(false);
//#endregion

//#region FUNCTIONS
function handleShowOptions(): void {
  isOpen.value = true;
}

function closeModal(): void {
  isOpen.value = false;
}
//#endregion
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
