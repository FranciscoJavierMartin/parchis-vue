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
