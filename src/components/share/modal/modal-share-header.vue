<template>
  <div class="modal-share-header">
    <h4>{{ label }}</h4>
    <button @click="$emit('close')">
      <BaseIcon type="close" fill="black" />
    </button>
  </div>
</template>

<script setup lang="ts">
import BaseIcon from '@/components/icons/base-icon.vue';

interface ModalShareHeaderProps {
  label?: string;
}

withDefaults(defineProps<ModalShareHeaderProps>(), { label: 'Share...' });

defineEmits<{ close: [isShare?: boolean] }>();
</script>

<style scoped>
.modal-share-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  margin-bottom: 20px;

  button {
    width: 25px;
    height: 25px;
    cursor: pointer;
    background-color: transparent;
    border: none;
  }
}
</style>
