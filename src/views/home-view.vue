<template>
  <PageWrapper>
    <RouterLink :to="{ name: ROUTES.OFFLINE.name }" class="button yellow">
      Play offline
    </RouterLink>
    <RouterLink :to="{ name: ROUTES.ONLINE.name }" class="button yellow"> Play online </RouterLink>
    <RouterLink :to="{ name: ROUTES.ABOUT.name }" class="button yellow"> About </RouterLink>
  </PageWrapper>
</template>

<script setup lang="ts">
import { ROUTES } from '@/constants/routes';
import PageWrapper from '@/layout/page-wrapper.vue';
</script>
