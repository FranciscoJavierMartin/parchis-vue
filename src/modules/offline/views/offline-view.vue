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
        <SetupPlayers @update-data="updateDataGame" />
      </template>
    </template>
  </PageWrapper>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import PageWrapper from '@layouts/components/wrapper/page-wrapper/page-wrapper.vue';
import GameLogo from '@common/components/game-logo/game-logo.vue';
import SetupPlayers from '@players/components/setup-players/setup-players.vue';
import Game from '@game/components/game/game.vue';
import MenuOptions from '@layouts/components/menu-options/menu-options.vue';
import BackButton from '@layouts/components/back-button/back-button/back-button.vue';
import type { DataOfflineGame } from '@game/interfaces/game.interface';
import { envVars } from '@/config/envVar';

//#region REFS
const dataGame = ref<DataOfflineGame | null>(null);
//#endregion

//#region FUNCTIONS
function updateDataGame(data: DataOfflineGame): void {
  dataGame.value = data;
}
//#endregion
</script>
