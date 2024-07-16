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
    <div v-if="typeGame === ETypeGame.OFFLINE" class="game-debug-selects">
      <GameDebugSelect
        v-model="playerSelected"
        :options="options['player']"
        title="Player"
        :disabled="!options['player']?.length"
      />
      <GameDebugSelect
        v-model="tokenSelected"
        :options="options['token']"
        title="Token"
        :disabled="!options['token']?.length"
      />
      <GameDebugSelect
        v-model="typeSelected"
        :options="options['type']"
        title="Type"
        :disabled="!options['type']?.length"
      />
      <GameDebugSelect
        v-model="positionSelected"
        :options="options['position']"
        title="Position"
        :disabled="!options['position']?.length"
      />
    </div>
    <div v-if="typeGame === ETypeGame.OFFLINE" class="game-debug-copy">
      <button :disabled="selects.position < 0" @click="handleCopyState">Copy state</button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, reactive, watch } from 'vue';
import { ETypeGame } from '@/constants/game';
import {
  copyToClipboard,
  getDebugPositionsTiles,
  getOptionsSelects,
  validateChangeToken,
} from '@/helpers/debug';
import type { IOptions, TOptions, TSelects } from '@/interfaces/debug';
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
}

const props = withDefaults(defineProps<TokensDebugProps>(), { typeGame: ETypeGame.OFFLINE });
const emit = defineEmits(['updateTokens']);

const selects = reactive<TSelects>({ player: -1, token: -1, type: -1, position: -1 });

const playerSelected = ref<number>(-1);
const tokenSelected = ref<number>(-1);
const typeSelected = ref<number>(-1);
const positionSelected = ref<number>(-1);

const options = computed(() => {
  const playerOptions: IOptions[] = props.players.map((v) => ({ id: v.index, label: v.color }));
  const tokenOptions: IOptions[] =
    selects.player >= 0
      ? props.listTokens[selects.player].tokens.map((v) => ({
          id: v.index,
          label: `Token ${v.index}`,
        }))
      : [];
  const typesOptions: IOptions[] =
    selects.token >= 0
      ? LIST_TYPE_TILE.map((v, index) => ({
          id: index,
          label: v,
        }))
      : [];
  const positionOptions: IOptions[] =
    selects.type >= 0
      ? getDebugPositionsTiles(selects.type, props.listTokens[selects.player].positionGame)
      : [];

  return {
    player: playerOptions,
    token: tokenOptions,
    type: typesOptions,
    position: positionOptions,
  };
});

function handleSelect(value: number, type: TOptions): void {
  const copySelects = { ...selects };
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
      emit('updateTokens', validateChangeToken(copySelects, props.listTokens));
      break;
  }

  selects.player = copySelects.player;
  selects.token = copySelects.token;
  selects.type = copySelects.type;
  selects.position = copySelects.position;
}

function handleCopyState(): void {
  copyToClipboard(JSON.stringify(props.listTokens));
}

watch(playerSelected, (newValue) => {
  handleSelect(newValue, 'player');
});

watch(tokenSelected, (newValue) => {
  handleSelect(newValue, 'token');
});

watch(typeSelected, (newValue) => {
  handleSelect(newValue, 'type');
});

watch(positionSelected, (newValue) => {
  handleSelect(newValue, 'position');
});
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

  .game-debug-copy {
    display: flex;
    align-items: center;
    justify-content: center;
    margin-top: 10px;

    button {
      font-weight: bold;
      cursor: pointer;
    }
  }
}
</style>
