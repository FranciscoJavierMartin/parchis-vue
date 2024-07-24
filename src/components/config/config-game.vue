<template>
  <form @submit="handleSubmit" class="game-offline glass-effect">
    <SelectNumberPlayers v-model="totalPlayers" />
    <button type="submit" class="button yellow game-offline-play">
      <PlayIcon fill="#8b5f00" />
      Play
    </button>
  </form>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import PlayIcon from '@/components/icons/play-icon.vue';
import SelectNumberPlayers from '@/components/base/select-number-players.vue';
import type { DataOfflineGame, TTotalPlayers } from '@/interfaces/game';
import { getInitialTotalPlayers } from '@/helpers/player';
import type { IPlayerOffline } from '@/interfaces/player';

defineEmits<{
  updateData: [data: DataOfflineGame];
}>();

const totalPlayers = ref<TTotalPlayers>(getInitialTotalPlayers());
const players = ref<IPlayerOffline[]>();

function handleSubmit(event: Event): void {
  event.preventDefault();
}
</script>

<style scoped>
.game-offline {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 80%;
  margin-top: 40px;
  border-radius: 16px;
  animation: fadeInLeft 0.5s ease both;

  .game-offline-play {
    display: flex;
    align-items: center;
    justify-content: center;
    padding: 10px 15px;
    margin-top: 20px;
    margin-bottom: 30px;
    font-size: 25px;
    font-weight: bold;
    text-transform: uppercase;
    border-radius: 10px;

    &:deep(svg) {
      width: 30px;
      height: 30px;
    }
  }
}
</style>
