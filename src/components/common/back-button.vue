<template>
  <button v-if="withConfirmation" class="button blue game-back-button">
    <ArrowLeft />
  </button>
  <RouterLink v-else :to="{ name: to }" class="button blue game-back-button">
    <ArrowLeft />
  </RouterLink>
</template>

<script setup lang="ts">
import type { TRoutesName } from '@/interfaces/routes';
import { useRouter } from 'vue-router';
import ArrowLeft from '@/components/icons/arrow-left.vue';
const router = useRouter();

interface BackButtonProps {
  to?: TRoutesName;
  withConfirmation?: boolean;
}

withDefaults(defineProps<BackButtonProps>(), { to: 'home', withConfirmation: false });
</script>

<style scoped>
.game-back-button {
}
</style>
