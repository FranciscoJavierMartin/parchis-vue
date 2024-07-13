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
import TotalTokens from '@/components/game/token/components/total-tokens/total-tokens.vue';
import type { TShowTotalTokens } from '@/interfaces/token';

interface ShowTotalTokensProps {
  totalTokens: TShowTotalTokens;
}

withDefaults(defineProps<ShowTotalTokensProps>(), {
  totalTokens: {} as unknown as () => TShowTotalTokens,
});
</script>
