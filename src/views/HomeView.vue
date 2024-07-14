<template>
  <AppWrapper>
    <Game :debug="true" :users="TEMP_USERS" :initial-turn="0" :total-players="totalPlayers" />
  </AppWrapper>
</template>

<script setup lang="ts">
import Game from '@/components/game/game.vue';
import AppWrapper from '@/components/wrapper/app-wrapper.vue';
import type { TTotalPlayers } from '@/interfaces/game';
import { TEMP_USERS } from '@/helpers/player';

// TODO: Use users.length instead of pass totalPlayers
const totalPlayers = TEMP_USERS.length as TTotalPlayers;
</script>
