<template>
  <BaseModal :show-modal="showModal">
    <div class="modal-share-wrapper">
      <ModalShareHeader @close="$emit('close')" />
      <ModalShareButtons :data="data" @close="$emit('close')" />
    </div>
  </BaseModal>
</template>

<script setup lang="ts">
import BaseModal from '@layouts/components/base-modal/base-modal.vue';
import ModalShareHeader from '@share/components/modal-share-header/modal-share-header.vue';
import ModalShareButtons from '@share/components/modal-share-buttons/modal-share-buttons.vue';

interface ShareModalProps {
  /** Data to share */
  data: ShareData;
  /** Show modal */
  showModal: boolean;
}

defineProps<ShareModalProps>();

defineEmits<{
  /** When press close button */
  close: [isShare?: boolean];
}>();
</script>

<style scoped>
.modal-share-wrapper {
  position: absolute;
  bottom: 0;
  width: var(--base-width);
  padding: 20px;
  background-color: white;
  border-radius: 15px 15px 0 0;
  box-shadow:
    rgba(17, 17, 26, 0.1) 0px 4px 16px,
    rgba(17, 17, 26, 0.1) 0px 8px 24px,
    rgba(17, 17, 26, 0.1) 0px 16px 56px;
  opacity: 0;
  animation: emerge 1000ms ease forwards;
  animation-composition: add;
  animation-delay: 1ms;
}
</style>
