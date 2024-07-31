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
import PageWrapper from '@layouts/components/wrapper/page-wrapper.vue';
import GameLogo from '@common/components/game-logo/game-logo.vue';
import ConfigGame from '@players/components/config-game/config-game.vue';
import Game from '@game/components/game/game.vue';
import MenuOptions from '@layouts/components/menu-options/menu-options.vue';
import BackButton from '@layouts/components/back-button/back-button.vue';
import type { DataOfflineGame } from '@/modules/game/interfaces/game.interface';
import { envVars } from '@/config/envVar';

const dataGame = ref<DataOfflineGame | null>(null);

function updateDataGame(data: DataOfflineGame): void {
  dataGame.value = data;
}
</script>
