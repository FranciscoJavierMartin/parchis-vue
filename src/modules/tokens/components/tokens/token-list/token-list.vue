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
  diceList: IDiceList[];
  listToken: IListTokens[];
  isDisabledUI?: boolean;
  debug?: boolean;
}

withDefaults(defineProps<TokenListProps>(), { isDisabledUI: false, debug: false });
defineEmits<{ handleSelectedToken: [selectTokenValues: ISelectTokenValues] }>();
</script>
