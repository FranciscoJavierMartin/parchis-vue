<template>
  <div class="modal-share-buttons">
    <div v-for="buttonData of BUTTONS" :key="buttonData.label" class="modal-share-button">
      <button :title="`Share in ${buttonData.label}`">
        <component :is="buttonData.icon" />
      </button>
      <span>{{ buttonData.label }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { BUTTONS } from '@/helpers/share';

interface ModalShareButtonsProps {
  data: ShareData;
}

defineProps<ModalShareButtonsProps>();

defineEmits<{ close: [isShare?: boolean] }>();
</script>

<style scoped>
.modal-share-buttons {
  display: flex;
  justify-content: space-between;
  width: 100%;

  .modal-share-button {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 25%;

    button {
      width: 40px;
      height: 40px;
      margin-bottom: 5px;
      cursor: pointer;
      background-color: transparent;
      border: none;
    }

    span {
      font-size: 13px;
    }
  }
}
</style>
