<template>
  <form @submit="handleSubmit" class="game-offline glass-effect">
    <SelectNumberPlayers v-model="totalPlayers" />
    <div class="game-offline-players">
      <PlayerInput
        v-for="player in players"
        :key="player.id"
        v-bind="player"
        v-model:color="player.color"
        v-model:name="player.name"
        v-model:is-bot="player.isBot"
        @update:color="(color) => handleColorDistribution(color, player.index)"
      />
    </div>
    <button type="submit" class="button yellow game-offline-play">
      <BaseIcon type="play" fill="#8b5f00" />
      Play
    </button>
  </form>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import SelectNumberPlayers from '@/components/base/select-number-players.vue';
import PlayerInput from '@/components/config/player-input.vue';
import BaseIcon from '@/components/icons/base-icon.vue';
import {
  changeColorPlayer,
  changeTotalPlayers,
  getGameData,
  getInitialBoardColors,
  getInitialDataOfflinePlayers,
  getInitialTotalPlayers,
} from '@/helpers/player';
import { savePlayerDataCache } from '@/helpers/storage';
import type { DataOfflineGame, TTotalPlayers } from '@/interfaces/game';
import type { IPlayerOffline } from '@/interfaces/player';
import type { TBoardColors, TColors } from '@/interfaces/board';

const emit = defineEmits<{
  updateData: [data: DataOfflineGame];
}>();

const totalPlayers = ref<TTotalPlayers>(getInitialTotalPlayers());
const players = ref<IPlayerOffline[]>(getInitialDataOfflinePlayers(totalPlayers.value));
const boardColors = ref<TBoardColors>(getInitialBoardColors());

function handleSubmit(event: Event): void {
  event.preventDefault();
  emit('updateData', getGameData(totalPlayers.value, players.value, boardColors.value));
}

function handleColorDistribution(color: TColors, index: number): void {
  const colorPlayers = changeColorPlayer(color, players.value, index, totalPlayers.value);
  players.value = colorPlayers.players;
  boardColors.value = colorPlayers.boardColors;
}

watch(totalPlayers, (newValue: TTotalPlayers) => {
  const newValues = changeTotalPlayers(newValue, players.value);

  players.value = newValues.players;
  boardColors.value = newValues.boardColors;
});

watch(
  players,
  (newValue: IPlayerOffline[]) => {
    savePlayerDataCache(newValue);
  },
  { deep: true },
);
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

  .game-offline-players {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 100%;
  }

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

    .icon-wrapper {
      width: 30px;
      height: 30px;
    }
  }
}
</style>
