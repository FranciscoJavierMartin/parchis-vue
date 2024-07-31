<template>
  <template v-if="totalTokens">
    <TotalTokens
      v-for="indexPosition in Object.keys(totalTokens).map((v) => +v)"
      :key="indexPosition"
      :index-position="indexPosition"
      :value="totalTokens[indexPosition]"
    />
  </template>
</template>

<script setup lang="ts">
import TotalTokens from '@tokens/components/token/components/total-tokens/total-tokens.vue';
import type { TShowTotalTokens } from '@/modules/tokens/interfaces/token.interface';

interface ShowTotalTokensProps {
  totalTokens: TShowTotalTokens;
}

withDefaults(defineProps<ShowTotalTokensProps>(), {
  totalTokens: {} as unknown as () => TShowTotalTokens,
});
</script>
