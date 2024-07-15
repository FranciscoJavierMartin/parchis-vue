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
      <!--<GameDebugSelect
        v-for="selectType of Object.keys(selects)"
        :key="selectType"
        :value="selects[selectType as TOptions]"
        :disabled="options[selectType as TOptions].length === 0"
        :title="selectType.toUpperCase()"
        :options="options[selectType as TOptions]"
        :on-change="
          (value) => {
            console.log(value);
            handleSelect(+value, selectType as TOptions);
          }
        "
      />-->
      <!--<div v-for="selectType of Object.keys(selects)" :key="selectType">
        {{ selects[selectType as TOptions] }}
      </div>-->
      <!--<select
        :value="player"
        @change="(event) => handleSelect((event.currentTarget as any).value, 'player')"
      >
        <option disabled value="-1">Player</option>
        <option v-for="{ id, label } in options.player" :key="id" :value="id">{{ label }}</option>
      </select>
      <select
        :value="token"
        @change="(event) => handleSelect((event.currentTarget as any).value, 'token')"
      >
        <option disabled value="-1">Token</option>
        <option v-for="{ id, label } in options.token" :key="id" :value="id">{{ label }}</option>
      </select>-->
      <!--<select
        v-for="selectType of Object.keys(selects)"
        :key="selectType"
        @change="
          (event) => handleSelect((event.currentTarget as any).value, selectType as TOptions)
        "
      >
        <option value="-1">{{ selectType.toUpperCase() }}</option>
        <option v-for="{ label, id } in options[selectType as TOptions]" :key="id" :value="id">
          {{ label }}
        </option>
      </select>-->
      <GameDebugSelect
        v-model="playerSelected"
        :options="options['player']"
        title="Player"
        :disabled="options['player'].length === 0"
      />
      <GameDebugSelect
        v-model="tokenSelected"
        :options="options['token']"
        title="Token"
        :disabled="options['token'].length === 0"
      />
      <GameDebugSelect
        v-model="typeSelected"
        :options="options['type']"
        title="Type"
        :disabled="options['type'].length === 0"
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
// import GameDebugSelect from '@/components/game/debug/game-debug-select.vue';
import GameDebugSelect from '@/components/game/debug/game-select.vue';
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

const options = computed(() => getOptionsSelects(selects, props.players, props.listTokens));

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
      //TODO: Emit event to update tokens
      emit('updateTokens', validateChangeToken(selects, props.listTokens));
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
