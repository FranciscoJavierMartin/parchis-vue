<template>
  <PageWrapper>
    <Game
      :debug="envVars.debug"
      :users="TEMP_USERS"
      :initial-turn="0"
      :total-players="totalPlayers"
    />
  </PageWrapper>
</template>

<script setup lang="ts">
import Game from '@/components/game/game.vue';
import type { TTotalPlayers } from '@/interfaces/game';
import { TEMP_USERS } from '@/helpers/player';
import { envVars } from '@/config/envVar';
import PageWrapper from '@/layout/page-wrapper.vue';

// TODO: Use users.length instead of pass totalPlayers
const totalPlayers = TEMP_USERS.length as TTotalPlayers;
</script>
