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
    <div class="game-debug-selects">
      <GameDebugSelect
        v-for="[selectType] of Object.entries(selects)"
        :key="selectType"
        :value="selects[selectType as TOptions]"
        :disabled="options[selectType as TOptions].length === 0"
        :title="selectType.toUpperCase()"
        :options="options[selectType as TOptions]"
        :on-change="
          (value) => {
            handleSelect(+value, selectType as TOptions);
          }
        "
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import { ETypeGame } from '@/constants/game';
import { getOptionsSelects, validateChangeToken } from '@/helpers/debug';
import type { TOptions, TSelects } from '@/interfaces/debug';
import type { TDiceValues } from '@/interfaces/dice';
import type { IActionsTurn, TTypeGame } from '@/interfaces/game';
import type { THandleSelectDice } from '@/interfaces/profile';
import type { IListTokens } from '@/interfaces/token';
import type { IPlayer } from '@/interfaces/user';
import GameDebugSelect from '@/components/game/debug/game-debug-select.vue';
import { LIST_TYPE_TILE } from '@/constants/debug';

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

function handleSelect(value: number, type: TOptions): void {
  const copySelects = { ...selects.value };
  copySelects[type] = value;

  switch (type) {
    case 'player':
      copySelects.token = -1;
      copySelects.type = -1;
      copySelects.position = -1;
      break;
    case 'token':
      // eslint-disable-next-line no-case-declarations
      const { typeTile, positionTile } = props.listTokens[copySelects.player].tokens[value];
      copySelects.type = LIST_TYPE_TILE.findIndex((v) => v === typeTile);
      copySelects.position = positionTile;
      break;
    case 'type':
      copySelects.position = -1;
      break;
    case 'position':
      //TODO: Emit event to update tokens
      validateChangeToken(selects.value, props.listTokens, props.setListTokens);
      break;
    default:
      break;
  }
}
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

  .game-debug-selects {
    display: flex;
    gap: 10px;
    width: 100%;
  }
}
</style>
