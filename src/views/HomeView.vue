<template>
  <AppWrapper>
    <GameBoard>
      <GameTile v-for="position of POSITION_TILES" :key="position.index" v-bind="position" />

      <GameToken
        color="RED"
        :coordinate="POSITION_TILES[POSITION_ELEMENTS_BOARD.BOTTOM_LEFT.startTileIndex].coordinate"
        type-tile="JAIL"
        :index="0"
        :dice-available="[]"
        :total-tokens="1"
        :position="1"
        :enable-tooltip="false"
        :is-moving="false"
        :animated="false"
        :position-tile="1"
        :can-select-token="false"
        :dice-list="[]"
        :handle-selected-token="handleSelectedToken"
      />

      <GameToken
        color="RED"
        :coordinate="POSITION_TILES[POSITION_ELEMENTS_BOARD.BOTTOM_LEFT.exitTileIndex].coordinate"
        type-tile="EXIT"
        :index="0"
        :dice-available="[]"
        :total-tokens="1"
        :position="1"
        :enable-tooltip="false"
        :is-moving="false"
        :animated="false"
        :position-tile="1"
        :can-select-token="false"
        :dice-list="[]"
        :handle-selected-token="handleSelectedToken"
      />

      <!-- Tokens in jail -->
      <!--<GameToken
        v-for="i in 4"
        :key="i"
        color="RED"
        :coordinate="positionsJailBottomLeft[i - 1].coordinate"
        type-tile="JAIL"
        :index="0"
        :dice-available="[]"
        :total-tokens="1"
        :position="1"
        :enable-tooltip="false"
        :is-moving="false"
        :animated="false"
        :position-tile="1"
        :can-select-token="false"
        :dice-list="[]"
        :handle-selected-token="handleSelectedToken"
      />-->

      <!--<GameTile
        v-for="position of positionsJailBottomLeft"
        :key="position.index"
        v-bind="position"
      />
      <GameTile v-for="position of positionsJailTopLeft" :key="position.index" v-bind="position" />
      <GameTile
        v-for="position of positionsJailBottomRight"
        :key="position.index"
        v-bind="position"
      />
      <GameTile v-for="position of positionsJailTopRight" :key="position.index" v-bind="position" />-->

      <!--<GameTile v-for="position of tileExitBottom" :key="position.index" v-bind="position" />
      <GameTile v-for="position of tileExitTop" :key="position.index" v-bind="position" />
      <GameTile v-for="position of tileExitLeft" :key="position.index" v-bind="position" />
      <GameTile v-for="position of tileExitRight" :key="position.index" v-bind="position" />-->

      <!-- Tokens in end tiles -->
      <!--<GameToken
        v-for="i in 4"
        :key="i"
        color="RED"
        :coordinate="FINAL_POSITIONS_VALUES.BOTTOM_LEFT[i - 1].coordinate"
        type-tile="END"
        :index="0"
        :dice-available="[]"
        :total-tokens="1"
        :position="1"
        :enable-tooltip="false"
        :is-moving="false"
        :animated="false"
        :position-tile="1"
        :can-select-token="false"
        :dice-list="[]"
        :handle-selected-token="handleSelectedToken"
      />-->

      <!--<GameToken
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
      />-->
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
import GameTile from '@/components/game/components/game-tile.vue';
import GameToken from '@/components/game/components/token/game-token.vue';
import AppWrapper from '@/components/wrapper/app/app-wrapper.vue';
import type { ISelectTokenValues } from '@/interfaces';
import { POSITION_ELEMENTS_BOARD, POSITION_TILES } from '@/utils/positions-board';

function handleSelectedToken(selectedTokenValues: ISelectTokenValues) {
  console.log('selectedTokenValues', selectedTokenValues);
}
</script>
