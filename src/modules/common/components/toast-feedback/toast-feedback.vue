<template>
  <div class="toast-container">
    <ul class="toast-list">
      <li v-for="{ id, message } of toast.messages.value" :key="id" class="toast-message">
        {{ message }}
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import useToastFeedback from '@common/composables/use-toast-feedback/use-toast-feedback';

const toast = useToastFeedback();

setInterval(() => {
  toast.addToast('Hello world');
}, 1000);
</script>

<style scoped>
.toast-container {
  position: absolute;
  bottom: 50px;
  z-index: var(--toast-z-index);
  width: 100%;

  .toast-list {
    display: flex;
    flex-direction: column;
    gap: 5px;
    align-items: center;
    width: 100%;
    max-width: 100%;
    list-style: none;

    .toast-message {
      width: 80%;
      max-width: max-content;
      padding: 10px 20px;
      color: white;
      text-align: center;
      text-wrap: wrap;
      background-color: rgba(0, 0, 0, 0.75);
      border-radius: 19px;
    }
  }
}
</style>
