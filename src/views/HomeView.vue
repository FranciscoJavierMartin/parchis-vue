<template>
  <AppWrapper>
    <Game :debug="false" :users="TEMP_USERS" :initial-turn="0" :total-players="totalPlayers" />
  </AppWrapper>
</template>

<script setup lang="ts">
import Game from '@/components/game/game.vue';
import AppWrapper from '@/components/wrapper/app/app-wrapper.vue';
import type { TTotalPlayers } from '@/interfaces';
import { TEMP_USERS } from '@/utils/data-players';

// TODO: Use users.length instead of pass totalPlayers
const totalPlayers = TEMP_USERS.length as TTotalPlayers;
</script>
