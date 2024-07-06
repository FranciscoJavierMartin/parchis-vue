<template>
  <AppWrapper>
    <!-- <GameBoard /> -->
    <GameDice :value="1" />
    <GameDice :value="2" />
    <GameDice :value="3" />
    <GameDice :value="4" />
    <GameDice :value="5" />
    <GameDice :value="6" />
  </AppWrapper>
</template>

<script setup lang="ts">
import GameBoard from '@/components/game/components/game-board.vue';
import GameDice from '@/components/game/components/game-dice.vue';
import AppWrapper from '@/components/wrapper/app/app-wrapper.vue';
</script>
