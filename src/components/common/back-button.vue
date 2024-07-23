<template>
  <button v-if="withConfirmation" class="button blue game-back-button" @click="handleBackButton">
    <ArrowLeft />
  </button>
  <RouterLink v-else :to="{ name: to }" class="button blue game-back-button">
    <ArrowLeft />
  </RouterLink>
  <BackConfirmationModal
    v-if="isOpen"
    @cancel="handleCancelButton"
    @confirmation="handleConfirmationButton"
  />
</template>

<script setup lang="ts">
import { ref, type Ref } from 'vue';
import { useRouter } from 'vue-router';
import type { TRoutesName } from '@/interfaces/routes';
import ArrowLeft from '@/components/icons/arrow-left.vue';
import BackConfirmationModal from '@/components/modals/back-confirmation-modal.vue';
import { ROUTES } from '@/constants/routes';

const isOpen: Ref<boolean> = ref<boolean>(true);

const router = useRouter();

interface BackButtonProps {
  to?: TRoutesName;
  withConfirmation?: boolean;
}

withDefaults(defineProps<BackButtonProps>(), { to: 'home', withConfirmation: true });

function handleBackButton(): void {
  isOpen.value = true;
}

function handleConfirmationButton(): void {
  router.replace({ name: ROUTES.HOME.name });
}

function handleCancelButton(): void {
  isOpen.value = false;
}
</script>

<style scoped>
.game-back-button {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 35px;
  height: 35px;
  border-radius: 5px;

  &:deep(svg) {
    width: 80%;
  }
}
</style>
