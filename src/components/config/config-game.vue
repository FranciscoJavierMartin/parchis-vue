<template>
  <form @submit="handleSubmit" class="game-offline glass-effect">
    <button type="submit" class="button yellow game-offline-play">
      <PlayIcon fill="#8b5f00" />
      Play
    </button>
  </form>
</template>

<script setup lang="ts">
import type { DataOfflineGame } from '@/interfaces/game';
import PlayIcon from '../icons/play-icon.vue';

defineEmits<{
  updateData: [data: DataOfflineGame];
}>();

function handleSubmit(event: Event): void {
  event.preventDefault();
}
</script>

<style scoped>
.game-offline {
  align-items: center;
  animation: fadeInLeft 0.5s ease both;
  border-radius: 16px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-top: 40px;
  width: 80%;

  .game-offline-play {
    align-items: center;
    border-radius: 10px;
    display: flex;
    font-size: 25px;
    font-weight: bold;
    justify-content: center;
    margin-bottom: 30px;
    margin-top: 20px;
    padding: 10px 15px;
    text-transform: uppercase;

    &:deep(svg) {
      height: 30px;
      width: 30px;
    }
  }
}
</style>
