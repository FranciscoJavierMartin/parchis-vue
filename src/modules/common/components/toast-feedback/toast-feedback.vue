<template>
  <div class="toast-container">
    <ul class="toast-list">
      <li class="toast-message">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Sed asperiores culpa eos autem
        delectus vitae ratione odio maiores esse eum, incidunt praesentium quo eius architecto
        deserunt. Sit velit rerum officiis!
      </li>
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
