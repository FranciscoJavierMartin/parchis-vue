<template>
  <Teleport to="#screen">
    <Transition name="fade">
      <div class="modal-overlay" v-if="showModal" @click="$emit('close')" />
    </Transition>
    <Transition name="pop">
      <dialog open class="modal" v-if="showModal">
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
defineProps(['showModal']);

defineEmits(['close']);
</script>

<style scoped>
.modal {
  position: fixed;
  /* position: absolute; */
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  margin: auto;
  text-align: center;
  /* max-width: calc(var(--base-width) * 0.75); */
  width: calc(var(--base-width) * 0.75);
  /* height: fit-content; */
  /* padding: 2rem; */
  border-radius: 1rem;
  background-color: white;
  z-index: 20;
  /* transform: none; */
}

.modal-overlay {
  content: '';
  position: fixed;
  /* position: absolute; */
  top: 0;
  right: 0;
  left: 0;
  bottom: 0;
  z-index: 19;
  background-color: rgb(0, 0, 0);
  opacity: 0.8;
  width: 100vw;
  height: 100vh;
}

.fade-enter-active,
.fade-leave-active {
  transition: opacity 2.4s linear;
}

.fade-enter-from,
.fade-leave-to {
  opacity: 0;
}

.pop-enter-active {
  animation: modal 3s ease-out;
}

.pop-leave-active {
  animation: modal 3s ease-in reverse;
}

@keyframes modal {
  0% {
    opacity: 0;
    transform: scale(0.3) translateY(-50%);
  }

  100% {
    opacity: 1;
    transform: scale(1) translateY(0);
  }
}
</style>
