<template>
  <AppWrapper>
    <GameBoard>
      <GameToken
        color="BLUE"
        :coordinate="{ x: SIZE_TILE * 6, y: SIZE_TILE * 12 }"
        type-tile="EXIT"
        :index="0"
        :dice-available="[]"
        :total-tokens="1"
        :position="1"
        :enable-tooltip="false"
        :is-moving="false"
        can-select-token
        :animated="false"
        :position-tile="1"
      />
      <GameToken
        color="GREEN"
        :coordinate="{ x: SIZE_TILE * 6, y: SIZE_TILE * 11 }"
        type-tile="EXIT"
        :index="0"
        :dice-available="[]"
        :total-tokens="1"
        :position="1"
        :enable-tooltip="false"
        :is-moving="false"
        can-select-token
        :animated="false"
        :position-tile="1"
      />
      <GameToken
        color="RED"
        :coordinate="{ x: SIZE_TILE * 6, y: SIZE_TILE * 10 }"
        type-tile="EXIT"
        :index="0"
        :dice-available="[]"
        :total-tokens="1"
        :position="1"
        :enable-tooltip="false"
        :is-moving="false"
        can-select-token
        :animated="false"
        :position-tile="1"
      />
      <GameToken
        color="YELLOW"
        :coordinate="{ x: SIZE_TILE * 6, y: SIZE_TILE * 9 }"
        type-tile="EXIT"
        :index="0"
        :dice-available="[]"
        :total-tokens="1"
        :position="1"
        :enable-tooltip="false"
        :is-moving="false"
        can-select-token
        :animated="false"
        :position-tile="1"
      />
    </GameBoard>
    <!-- <GameDice :value="1" />
    <GameDice :value="2" />
    <GameDice :value="3" />
    <GameDice :value="4" />
    <GameDice :value="5" />
    <GameDice :value="6" /> -->
  </AppWrapper>
</template>

<script setup lang="ts">
import GameBoard from '@/components/game/components/game-board.vue';
import GameDice from '@/components/game/components/game-dice.vue';
import GameToken from '@/components/game/components/token/game-token.vue';
import AppWrapper from '@/components/wrapper/app/app-wrapper.vue';
import { SIZE_TILE } from '@/utils/constants';
</script>
