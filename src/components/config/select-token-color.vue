<template>
  <div class="game-offline-token-wrapper"></div>
</template>

<script lang="ts" setup>
import type { TColors } from '@/interfaces/board';

interface SelectTokenColorProps {
  disabled: boolean;
  color: TColors;
}

defineProps<SelectTokenColorProps>();

defineEmits<{
  changeColor: [color: TColors];
}>();
</script>


<style scoped>
.game-offline-token-wrapper{
  
}
</style>