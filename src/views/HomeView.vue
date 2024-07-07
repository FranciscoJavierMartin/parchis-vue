<template>
  <AppWrapper>
    <GameBoard>
      <GameTile v-for="position of POSITION_TILES" :key="position.index" v-bind="position" />

      <GameTile
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
      <GameTile v-for="position of positionsJailTopRight" :key="position.index" v-bind="position" />

      <GameTile v-for="position of tileExitBottom" :key="position.index" v-bind="position" />
      <GameTile v-for="position of tileExitTop" :key="position.index" v-bind="position" />
      <GameTile v-for="position of tileExitLeft" :key="position.index" v-bind="position" />
      <GameTile v-for="position of tileExitRight" :key="position.index" v-bind="position" />

      <!-- <GameTile
        v-for="position of FINAL_POSITIONS_VALUES.BOTTOM_LEFT"
        :key="position.index"
        v-bind="position"
      />
      <GameTile
        v-for="position of FINAL_POSITIONS_VALUES.BOTTOM_RIGHT"
        :key="position.index"
        v-bind="position"
      />
      <GameTile
        v-for="position of FINAL_POSITIONS_VALUES.TOP_LEFT"
        :key="position.index"
        v-bind="position"
      />
      <GameTile
        v-for="position of FINAL_POSITIONS_VALUES.TOP_RIGHT"
        :key="position.index"
        v-bind="position"
      />-->

      <GameToken
        v-for="i in 4"
        :key="i"
        color="RED"
        :coordinate="FINAL_POSITIONS_VALUES.TOP_RIGHT[i - 1].coordinate"
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
      />

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

import {
  EXIT_TILES_VALUES,
  FINAL_POSITIONS_VALUES,
  POSITION_TILES,
  calculatePosition,
  getStartPositions,
} from '@/utils/positions-board';

const positionsJailBottomLeft = getStartPositions(2, 11);
const positionsJailTopLeft = getStartPositions(2, 2);
const positionsJailBottomRight = getStartPositions(11, 2);
const positionsJailTopRight = getStartPositions(11, 11);

const tileExitBottom = calculatePosition(EXIT_TILES_VALUES.BOTTOM_LEFT);
const tileExitLeft = calculatePosition(EXIT_TILES_VALUES.TOP_LEFT);
const tileExitRight = calculatePosition(EXIT_TILES_VALUES.BOTTOM_RIGHT);
const tileExitTop = calculatePosition(EXIT_TILES_VALUES.TOP_RIGHT);

function handleSelectedToken(selectedTokenValues: ISelectTokenValues) {
  console.log('selectedTokenValues', selectedTokenValues);
}
</script>
