<template>
  <div v-if="dataGame"></div>
  <PageWrapper v-else>
    <GameLogo />
    <ConfigGame @update-data="updateDataGame" />
  </PageWrapper>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import PageWrapper from '@/layout/page-wrapper.vue';
import GameLogo from '@/components/common/game-logo.vue';
import type { DataOfflineGame } from '@/interfaces/game';
import ConfigGame from '@/components/config/config-game.vue';

const dataGame = ref<DataOfflineGame | null>(null);

function updateDataGame(data: DataOfflineGame): void {
  dataGame.value = data;
}
</script>
