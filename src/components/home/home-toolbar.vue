<template>
  <div class="home-toolbar">
    <RouterLink :to="{ name: ROUTES.ABOUT.name }" class="button blue" title="About">
      <InfoIcon fill="none" />
    </RouterLink>
    <MenuShare :data="dataShare">
      <button class="button blue" title="Share">
        <ShareIcon />
      </button>
    </MenuShare>
    <a :href="API_LOGOUT" class="button blue" title="Logout">
      <!-- Logout icon -->
      Logout
    </a>
  </div>
</template>

<script setup lang="ts">
import { ROUTES } from '@/constants/routes';
import InfoIcon from '@/components/icons/info-icon.vue';
import ShareIcon from '@/components/icons/share-icon.vue';
import MenuShare from '@/components/share/menu-share.vue';
import { API_LOGOUT } from '@/constants/online';

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

    &:deep(svg) {
      width: 30px;
    }
  }
}
</style>
