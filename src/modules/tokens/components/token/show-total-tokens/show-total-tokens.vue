<template>
  <!-- TODO: Remove if -->
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
import TotalTokens from '@tokens/components/token/total-tokens/total-tokens.vue';
import type { TShowTotalTokens } from '@tokens/interfaces/token.interface';

interface ShowTotalTokensProps {
  /** Record to contain tokens info */
  totalTokens: TShowTotalTokens;
}

withDefaults(defineProps<ShowTotalTokensProps>(), {
  totalTokens: {} as unknown as () => TShowTotalTokens,
});
</script>
