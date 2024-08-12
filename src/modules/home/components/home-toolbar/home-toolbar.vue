<template>
  <div class="home-toolbar">
    <RouterLink :to="{ name: ROUTES.ABOUT.name }" class="button blue" title="About">
      <BaseIcon type="info" />
    </RouterLink>
    <ShareButton :data="dataShare">
      <template #default="{ onClick }">
        <button title="Share" class="button blue" @click="onClick">
          <BaseIcon type="share" />
        </button>
      </template>
    </ShareButton>
    <button
      v-if="isAuth"
      :href="API_LOGOUT"
      class="button blue"
      title="Logout"
      @click="() => addToast('Hello')"
    >
      <BaseIcon type="logout" />
    </button>
  </div>
</template>

<script setup lang="ts">
import ShareButton from '@share/components/share-button/share-button.vue';
import BaseIcon from '@common/components/icons/base-icon.vue';
import { ROUTES } from '@/router/routes';
import { API_LOGOUT } from '@online/constants/online.constants';
import { inject } from 'vue';
import type { TAddToastFunction } from '@toast/interfaces/toast.interface';
import { ToastAddToastSymbol } from '@toast/constants/toast.constants';

interface HomeToolbarProps {
  /** Is user authenticated */
  isAuth: boolean;
}

defineProps<HomeToolbarProps>();

const dataShare: ShareData = {
  title: 'Parchis',
  text: "Let's play Parchis",
  url: window.location.href,
};
const addToast = inject<TAddToastFunction>(ToastAddToastSymbol)!;
</script>

<style scoped>
.home-toolbar {
  display: flex;
  gap: 20px;
  align-items: center;
  justify-content: center;
  width: 50%;
  margin-top: 30px;
  animation: bounceIn 0.8s ease both;

  .button {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 50px;
    height: 50px;
    border-radius: 5px;

    .icon-wrapper {
      width: 30px;
    }
  }
}
</style>
