<template>
  <template v-for="{ tokens, index } in listToken" :key="index">
    <GameToken
      v-for="token in tokens"
      v-bind="token"
      :key="token.index"
      :dice-list="diceList"
      :debug="debug"
      :is-disabled-u-i="isDisabledUI"
      :handle-selected-token="handleSelectedToken"
    />
  </template>
</template>

<script setup lang="ts">
import type { IDiceList } from '@/interfaces/dice';
import type { IListTokens, ISelectTokenValues } from '@/interfaces/token';
import GameToken from '@/components/game/token/game-token.vue';

interface TokenListProps {
  diceList: IDiceList[];
  listToken: IListTokens[];
  isDisabledUI?: boolean;
  debug?: boolean;
  handleSelectedToken: (selectTokenValues: ISelectTokenValues) => void;
}

withDefaults(defineProps<TokenListProps>(), { isDisabledUI: false, debug: false });
</script>
