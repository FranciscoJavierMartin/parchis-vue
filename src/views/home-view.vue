<template>
  <PageWrapper>
    <template #default>
      <GameLogo />
      <div class="links">
        <RouterLink :to="{ name: ROUTES.OFFLINE.name }" class="button yellow">
          Play offline
        </RouterLink>
        <RouterLink :to="{ name: ROUTES.ONLINE.name }" class="button yellow">
          Play online
        </RouterLink>
        <RouterLink :to="{ name: ROUTES.ABOUT.name }" class="button yellow"> About </RouterLink>
        <MenuShare :data="dataShare">
          <template #default="{ onClick }">
            <button @click="onClick">Share</button>
          </template>
        </MenuShare>
      </div>
    </template>
    <template #rightOption>
      <MenuOptions />
    </template>
  </PageWrapper>
</template>

<script setup lang="ts">
import GameLogo from '@/components/common/game-logo.vue';
import PageWrapper from '@/layout/page-wrapper.vue';
import MenuOptions from '@/components/common/menu-options.vue';
import MenuShare from '@/components/share/menu-share.vue';
import { ROUTES } from '@/constants/routes';

const dataShare: ShareData = {
  title: 'Parchis',
  text: "Let's play Parchis",
  url: window.location.href,
};
</script>

<style scoped>
.links {
  display: flex;
}
</style>
