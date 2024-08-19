<template>
  <Teleport to="#screen">
    <Transition name="fade">
      <!-- eslint-disable vuejs-accessibility/click-events-have-key-events -->
      <!-- eslint-disable-next-line vuejs-accessibility/no-static-element-interactions -->
      <div v-if="showModal" class="modal-overlay" @click="$emit('close')" tabindex="-1" />
    </Transition>
    <Transition name="pop" :css="enableModalAnimation">
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
  /** Enable modal animation */
  enableModalAnimation?: boolean;
}

withDefaults(defineProps<BaseModalProps>(), { enableModalAnimation: true });

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
  background-color: black;
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
