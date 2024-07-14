<template>
  <div class="game-debug-tokens">
    <div class="game-debug-dice">
      <button
        v-for="index in 6"
        :key="index"
        :disabled="actionsTurn.disabledDice"
        @click="() => handleSelectDice(index as TDiceValues, false)"
      >
        {{ index }}
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { ETypeGame } from '@/constants/game';
import { getOptionsSelects } from '@/helpers/debug';
import type { TSelects } from '@/interfaces/debug';
import type { TDiceValues } from '@/interfaces/dice';
import type { IActionsTurn, TTypeGame } from '@/interfaces/game';
import type { THandleSelectDice } from '@/interfaces/profile';
import type { IListTokens } from '@/interfaces/token';
import type { IPlayer } from '@/interfaces/user';

interface TokensDebugProps {
  players: IPlayer[];
  listTokens: IListTokens[];
  actionsTurn: IActionsTurn;
  typeGame: TTypeGame;
  handleSelectDice: THandleSelectDice;
  setListTokens: Function;
}

const props = withDefaults(defineProps<TokensDebugProps>(), { typeGame: ETypeGame.OFFLINE });

const selects = ref<TSelects>({ player: -1, token: -1, type: -1, position: -1 });
const options = getOptionsSelects(selects.value, props.players, props.listTokens);
</script>

<style scoped>
.game-debug-tokens {
  position: absolute;
  bottom: 15px;

  .game-debug-dice {
    display: flex;
    gap: 5px;
    justify-content: center;
    margin-bottom: 10px;

    button {
      width: 25px;
      height: 25px;
      font-weight: bold;
      cursor: pointer;
    }
  }
}
</style>
