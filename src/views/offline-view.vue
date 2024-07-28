<template>
  <PageWrapper>
    <template #leftOption>
      <BackButton />
    </template>
    <template #rightOption>
      <MenuOptions />
    </template>
    <template #default>
      <div v-if="dataGame">
        <Game v-bind="dataGame" :debug="envVars.debug" />
      </div>
      <template v-else>
        <GameLogo />
        <ConfigGame @update-data="updateDataGame" />
      </template>
    </template>
  </PageWrapper>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import PageWrapper from '@/layout/page-wrapper.vue';
import GameLogo from '@/components/common/game-logo.vue';
import ConfigGame from '@/components/config/config-game.vue';
import Game from '@/components/game/game.vue';
import MenuOptions from '@/components/common/menu-options.vue';
import BackButton from '@/components/common/back-button.vue';
import type { DataOfflineGame } from '@/interfaces/game';
import { envVars } from '@/config/envVar';

const dataGame = ref<DataOfflineGame | null>(null);

function updateDataGame(data: DataOfflineGame): void {
  dataGame.value = data;
}
</script>
