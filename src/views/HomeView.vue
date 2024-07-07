<template>
  <AppWrapper>
    <Game :debug="true" />
  </AppWrapper>
</template>

<script setup lang="ts">
import Game from '@/components/game/game.vue';
import AppWrapper from '@/components/wrapper/app/app-wrapper.vue';
</script>
