<template>
  <div class="toast-container">
    <ul class="toast-list">
      <li class="toast-message">Hello world</li>
    </ul>
  </div>
</template>

<script setup lang="ts">
interface ToastFeedbackProps {
  // message: string;
}

// defineProps<ToastFeedbackProps>();
</script>

<style scoped>
.toast-container {
  position: absolute;
  bottom: 50px;

  .toast-list {
    list-style: none;

    .toast-message {
      padding: 10px 20px;
      color: white;
      background-color: rgba(0, 0, 0, 0.75);
      border-radius: 19px;
    }
  }
}
</style>
