<template>
  <Teleport to="#toast-container">
    <div class="toast-container">
      <div class="toast-wrapper">
        <span>{{ text }}</span>
      </div>
    </div>
  </Teleport>
</template>

<script setup lang="ts">
interface ToastFeedbackProps {
  text: string;
}

defineProps<ToastFeedbackProps>();
</script>

<style scoped>
.toast-container {
  position: absolute;
  bottom: 50px;
  left: 0;
  z-index: 20;
  width: 100%;

  .toast-wrapper {
    max-width: max-content;
    padding: 10px 15px;
    margin: auto;
    color: white;
    background-color: rgba(0, 0, 0, 0.95);
    border-radius: 16px;
  }
}
</style>
