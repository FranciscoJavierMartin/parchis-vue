<template>
  <div class="home-toolbar">
    <RouterLink :to="{ name: ROUTES.ABOUT.name }" class="button blue" title="About">
      <BaseIcon type="info" />
    </RouterLink>
    <MenuShare :data="dataShare">
      <template #default="{ onClick }">
        <button title="Share" class="button blue" @click="onClick">
          <BaseIcon type="share" />
        </button>
      </template>
    </MenuShare>
    <a v-if="isAuth" :href="API_LOGOUT" class="button blue" title="Logout">
      <BaseIcon type="logout" />
    </a>
  </div>
</template>

<script setup lang="ts">
import MenuShare from '@share/components/share-button/share-button.vue';
import BaseIcon from '@common/components/icons/base-icon.vue';
import { ROUTES } from '@/router/routes';
import { API_LOGOUT } from '@online/constants/online.constants';

interface HomeToolbarProps {
  isAuth: boolean;
}

const dataShare: ShareData = {
  title: 'Parchis',
  text: "Let's play Parchis",
  url: window.location.href,
};

defineProps<HomeToolbarProps>();
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
