<template>
  <Teleport to="#screen">
    <Transition name="fade">
      <div class="modal-overlay" v-if="showModal" @click="$emit('close')" />
    </Transition>
    <!-- TODO: Pass value 'css' as props -->
    <Transition name="pop" :css="false">
      <dialog v-if="showModal" ref="trapRef" open class="modal">
        <slot />
      </dialog>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
import useTrapFocus from '@common/composables/use-focus-trap/use-focus-trap';

interface BaseModalProps {
  /** Show modal */
  showModal: boolean;
}

defineProps<BaseModalProps>();

defineEmits<{
  /** Close modal */
  close: [];
}>();

const { trapRef } = useTrapFocus();
</script>

<style scoped>
.modal-overlay {
  position: fixed;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: calc(var(--modal-z-index) - 1);
  width: 100vw;
  height: 100vh;
  background-color: rgb(0, 0, 0);
  opacity: 0.8;
}

.modal {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: var(--modal-z-index);
  display: grid;
  place-items: center;
  width: 75%;
  margin: auto;
  background-color: transparent;
  border: none;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.4s linear;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.pop-enter-active {
  animation: scaleUp 0.5s;
}

.pop-leave-active {
  animation: scaleUp 0.5s reverse;
}
</style>
