<template>
  <template v-for="{ tokens, index } in listToken" :key="index">
    <GameToken
      v-for="token in tokens"
      v-bind="token"
      :key="token.index"
      :dice-list="diceList"
      :debug="debug"
      :is-disabled-u-i="isDisabledUI"
      @handle-selected-token="
        (selectedTokenValues: ISelectTokenValues) =>
          $emit('handleSelectedToken', selectedTokenValues)
      "
    />
  </template>
</template>

<script setup lang="ts">
import type { IDiceList } from '@dice/interfaces/dice.interface';
import type { IListTokens, ISelectTokenValues } from '@tokens/interfaces/token.interface';
import GameToken from '@tokens/components/token/components/game-token/game-token.vue';

interface TokenListProps {
  /** Dice list */
  diceList: IDiceList[];
  /** Token list */
  listToken: IListTokens[];
  /** Disable UI interaction */
  isDisabledUI?: boolean;
  /** Enable debug */
  debug?: boolean;
}

withDefaults(defineProps<TokenListProps>(), { isDisabledUI: false, debug: false });
defineEmits<{
  /** Emitted when select dice */
  handleSelectedToken: [selectTokenValues: ISelectTokenValues];
}>();
</script>
