<template>
  <div class="game-debug-tokens">
    <div class="game-debug-dice">
      <button
        v-for="index in 6"
        :key="index"
        :disabled="actionsTurn.disabledDice"
        @click="
          $emit('handleSelectDice', { diceValue: index as TDiceValues, isActionSocket: false })
        "
      >
        {{ index }}
      </button>
    </div>
    <div v-if="typeGame === ETypeGame.OFFLINE" class="game-debug-selects">
      <DebugSelect
        v-model="playerSelected"
        :options="options['player']"
        title="Player"
        :disabled="!options['player']?.length"
      />
      <DebugSelect
        v-model="tokenSelected"
        :options="options['token']"
        title="Token"
        :disabled="!options['token']?.length"
      />
      <DebugSelect
        v-model="typeSelected"
        :options="options['type']"
        title="Type"
        :disabled="!options['type']?.length"
      />
      <DebugSelect
        v-model="positionSelected"
        :options="options['position']"
        title="Position"
        :disabled="!options['position']?.length"
      />
    </div>
    <div v-if="typeGame === ETypeGame.OFFLINE" class="game-debug-copy">
      <button :disabled="selects.position < 0" @click="handleCopyState">
        {{ t('debug.copyState') }}
      </button>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, computed, reactive, watch } from 'vue';
import { useI18n } from 'vue-i18n';
import DebugSelect from '@debug/components/debug-select/debug-select.vue';
import { ETypeGame } from '@game/interfaces/game.enum';
import { getOptionsSelects, validateChangeToken } from '@debug/helpers/debug.helper';
import type { TOptions, TSelects } from '@debug/interfaces/debug.interface';
import type { TDiceValues } from '@dice/interfaces/dice.interface';
import type { IActionsTurn, TTypeGame } from '@game/interfaces/game.interface';
import type { IListTokens } from '@tokens/interfaces/token.interface';
import type { IPlayer } from '@players/interfaces/user.interface';
import { LIST_TYPE_TILE } from '@debug/constants/debug.constants';
import { copyToClipboard } from '@common/helpers/copy-to-clipboard.helper';

interface TokensDebugProps {
  /** players info */
  players: IPlayer[];
  /** Token list */
  listTokens: IListTokens[];
  /** Turn info */
  actionsTurn: IActionsTurn;
  /** Game mode */
  typeGame: TTypeGame;
}

const props = withDefaults(defineProps<TokensDebugProps>(), { typeGame: ETypeGame.OFFLINE });
const emit = defineEmits<{
  /** Update tokens */
  updateTokens: [listTokens: IListTokens[]];
  /** Handle selected dice */
  handleSelectDice: [data: { diceValue?: TDiceValues; isActionSocket?: boolean }];
}>();
const { t } = useI18n();

//#region REFS
const selects = reactive<TSelects>({ player: -1, token: -1, type: -1, position: -1 });

const playerSelected = ref<number>(-1);
const tokenSelected = ref<number>(-1);
const typeSelected = ref<number>(-1);
const positionSelected = ref<number>(-1);
//#endregion

//#region COMPUTED
const options = computed(() => getOptionsSelects(selects, props.players, props.listTokens));
//#endregion

//#region FUNCTIONS
/**
 * Update debug data
 * @param value Value selected
 * @param type Select updated
 */
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

/**
 * Copy state to clipboard
 */
function handleCopyState(): void {
  copyToClipboard(JSON.stringify(props.listTokens));
}
//#endregion

//#region WATCHERS
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
//#endregion
</script>

<style scoped>
.game-debug-tokens {
  position: absolute;
  bottom: 15px;
  width: 100%;

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
    justify-content: center;
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
