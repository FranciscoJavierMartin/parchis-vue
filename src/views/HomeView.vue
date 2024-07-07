<template>
  <AppWrapper>
    <GameBoard>
      <GameToken
        color="RED"
        :coordinate="{ x: SIZE_TILE * 6, y: SIZE_TILE * 12 }"
        type-tile="EXIT"
        :index="0"
        :dice-available="[{ key: 1, value: 1 }]"
        :total-tokens="1"
        :position="1"
        :enable-tooltip="true"
        :is-moving="false"
        can-select-token
        :animated="false"
        :position-tile="1"
        :dice-list="[{ key: 1, value: 1 }]"
        :handle-selected-token="handleSelectedToken"
      />
      <GameToken
        color="BLUE"
        :coordinate="{ x: SIZE_TILE * 1, y: SIZE_TILE * 8 }"
        type-tile="EXIT"
        :index="0"
        :dice-available="[
          { key: 1, value: 1 },
          { key: 5, value: 2 },
        ]"
        :total-tokens="1"
        :position="1"
        :enable-tooltip="false"
        :is-moving="false"
        can-select-token
        :animated="false"
        :position-tile="1"
        :dice-list="[
          { key: 1, value: 1 },
          { key: 5, value: 2 },
        ]"
        :handle-selected-token="handleSelectedToken"
      />
      <!--<GameToken
        color="GREEN"
        :coordinate="{ x: SIZE_TILE * 6, y: SIZE_TILE * 12 }"
        type-tile="EXIT"
        :index="1"
        :dice-available="[]"
        :total-tokens="5"
        :position="2"
        :enable-tooltip="false"
        :is-moving="false"
        can-select-token
        :animated="false"
        :position-tile="1"
      />
      <GameToken
        color="RED"
        :coordinate="{ x: SIZE_TILE * 6, y: SIZE_TILE * 12 }"
        type-tile="EXIT"
        :index="2"
        :dice-available="[]"
        :total-tokens="5"
        :position="3"
        :enable-tooltip="false"
        :is-moving="false"
        can-select-token
        :animated="false"
        :position-tile="1"
      />
      <GameToken
        color="YELLOW"
        :coordinate="{ x: SIZE_TILE * 6, y: SIZE_TILE * 12 }"
        type-tile="EXIT"
        :index="3"
        :dice-available="[]"
        :total-tokens="5"
        :position="4"
        :enable-tooltip="false"
        :is-moving="false"
        can-select-token
        :animated="false"
        :position-tile="1"
      />-->
    </GameBoard>
  </AppWrapper>
</template>

<script setup lang="ts">
import GameBoard from '@/components/game/components/game-board.vue';
import GameToken from '@/components/game/components/token/game-token.vue';
import AppWrapper from '@/components/wrapper/app/app-wrapper.vue';
import type { ISelectTokenValues } from '@/interfaces';
import { SIZE_TILE } from '@/utils/constants';

function handleSelectedToken(selectedTokenValues: ISelectTokenValues) {
  console.log('selectedTokenValues', selectedTokenValues);
}
</script>
