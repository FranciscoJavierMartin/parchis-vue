<template>
  <BaseModal>
    <div ref="trapRef" class="modal-share-wrapper">
      <h1>Hello world</h1>
    </div>
  </BaseModal>
</template>

<script setup lang="ts">
import BaseModal from '@/components/base/base-modal.vue';
import useFocusTrap from '@/composables/use-focus-trap';

const { trapRef } = useFocusTrap();
</script>

<style scoped>
.modal-share-wrapper {
  position: absolute;
  bottom: 0;
  width: 100%;
  padding: 20px;
  background-color: white;
  border-radius: 15px 15px 0 0;
  box-shadow:
    rgba(17, 17, 26, 0.1) 0px 4px 16px,
    rgba(17, 17, 26, 0.1) 0px 8px 24px,
    rgba(17, 17, 26, 0.1) 0px 16px 56px;
  animation: bounceIn 500ms ease both;
}
</style>
