<template>
  <Teleport to="#screen">
    <dialog ref="trapRef" open class="modal-wrapper">
      <div class="modal-container">
        <slot />
      </div>
    </dialog>
  </Teleport>
</template>

<script setup lang="ts">
import useTrapFocus from '@common/composables/use-focus-trap/use-focus-trap';

const { trapRef } = useTrapFocus();
</script>

<style scoped>
.modal-wrapper {
  position: absolute;
  top: 0;
  left: 0;
  z-index: var(--modal-z-index);
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  background: rgb(0 0 0 / 80%);

  .modal-container {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 75%;
  }
}
</style>
