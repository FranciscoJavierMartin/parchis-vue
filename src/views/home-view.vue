<template>
  <PageWrapper>
    <GameLogo />
    <div class="links">
      <RouterLink :to="{ name: ROUTES.OFFLINE.name }" class="button yellow">
        Play offline
      </RouterLink>
      <RouterLink :to="{ name: ROUTES.ONLINE.name }" class="button yellow">
        Play online
      </RouterLink>
      <RouterLink :to="{ name: ROUTES.ABOUT.name }" class="button yellow"> About </RouterLink>
    </div>
  </PageWrapper>
</template>

<script setup lang="ts">
import GameLogo from '@/components/common/game-logo.vue';
import { ROUTES } from '@/constants/routes';
import PageWrapper from '@/layout/page-wrapper.vue';
</script>

<style scoped>
.links {
  display: flex;
}
</style>
