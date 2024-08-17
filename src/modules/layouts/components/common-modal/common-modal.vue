<template>
  <Teleport to="#screen">
    <Transition name="fade">
      <div class="modal-overlay" v-if="showModal" @click="$emit('close')" />
    </Transition>
    <Transition name="pop">
      <dialog v-if="showModal" ref="trapRef" open class="modal">
        <h1>Vue Transitions</h1>
        <p>
          Lorem ipsum dolor sit amet consectetur, adipisicing elit. Veniam distinctio vitae
          provident, officia, nisi veritatis maiores officiis similique molestiae adipisci quaerat
          nulla molestias ut sapiente dignissimos dolorum alias, nam optio.
        </p>
        <button @click="$emit('close')">Hide modal</button>
      </dialog>
    </Transition>
  </Teleport>
</template>

<script setup lang="ts">
import useTrapFocus from '@common/composables/use-focus-trap/use-focus-trap';

defineProps(['showModal']);

defineEmits(['close']);

const { trapRef } = useTrapFocus();
</script>

<style scoped>
.modal {
  position: absolute;
  top: 0;
  right: 0;
  bottom: 0;
  left: 0;
  z-index: var(--modal-z-index);
  display: grid;
  place-items: center;
  width: calc(var(--base-width) * 0.75);
  margin: auto;
  border: none;
}

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
