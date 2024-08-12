<template>
  <div class="toast-container">
    <ul v-if="toasts.length" class="toast-list">
      <li v-for="{ message, id } of toasts" :key="id" class="toast-message" @click="remove(id)">
        {{ message }}
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts">
import { inject } from 'vue';
import { ToastRemoveToastSymbol, ToastMessagesSymbol } from '@toast/constants/toast.constants';
import type { TRemoveToastFunction, TToastMessages } from '@toast/interfaces/toast.interface';

const toasts = inject<TToastMessages>(ToastMessagesSymbol)!;
const remove = inject<TRemoveToastFunction>(ToastRemoveToastSymbol)!;
</script>

<style scoped>
.toast-container {
  position: absolute;
  bottom: 50px;

  .toast-list {
    display: flex;
    flex-direction: column;
    gap: 5px;
    align-items: center;
    list-style: none;

    .toast-message {
      z-index: var(--toast-z-index);
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
