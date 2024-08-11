<template>
  <button v-if="withConfirmation" class="button blue game-back-button" @click="handleBackButton">
    <BaseIcon type="back" />
  </button>
  <RouterLink v-else :to="{ name: to }" class="button blue game-back-button">
    <BaseIcon type="back" />
  </RouterLink>
  <BackConfirmationModal
    v-if="isOpen"
    @cancel="handleCancelButton"
    @confirmation="handleConfirmationButton"
  />
</template>

<script setup lang="ts">
import { ref, type Ref } from 'vue';
import { useRouter, type Router } from 'vue-router';
import BaseIcon from '@common/components/icons/base-icon.vue';
import BackConfirmationModal from '@layouts/components/back-button/back-confirmation-modal/back-confirmation-modal.vue';
import type { TRoutesName } from '@common/interfaces/routes.interface';
import { ROUTES } from '@/router/routes';

interface BackButtonProps {
  /** Where to go (name) */
  to?: TRoutesName;
  /** Display modal before navigate */
  withConfirmation?: boolean;
}

withDefaults(defineProps<BackButtonProps>(), { to: 'home', withConfirmation: true });

//#region REFS
const isOpen: Ref<boolean> = ref<boolean>(false);
//#endregion

const router: Router = useRouter();

//#region FUNCTIONS
function handleBackButton(): void {
  isOpen.value = true;
}

function handleConfirmationButton(): void {
  router.replace({ name: ROUTES.HOME.name });
}

function handleCancelButton(): void {
  isOpen.value = false;
}
//#endregion
</script>

<style scoped>
.game-back-button {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 35px;
  height: 35px;
  border-radius: 5px;

  .icon-wrapper {
    width: 80%;
  }
}
</style>
