<template>
  <AppWrapper>
    <Game :debug="false" :users="TEMP_USERS" :initial-turn="0" :total-players="totalPlayers" />
  </AppWrapper>
</template>

<script setup lang="ts">
import Game from '@/components/game/game.vue';
import AppWrapper from '@/components/wrapper/app/app-wrapper.vue';
import type { IUser, TTotalPlayers } from '@/interfaces';

const TEMP_USERS: IUser[] = [
  {
    id: '1',
    name: 'Player 01',
    isBot: false,
  },
  {
    id: '2',
    name: 'Player 02',
    isBot: true,
  },
  {
    id: '3',
    name: 'Player 03',
    isBot: false,
  },
  {
    id: '4',
    name: 'Player 04',
    isBot: false,
  },
];

const totalPlayers = TEMP_USERS.length as TTotalPlayers;
</script>
