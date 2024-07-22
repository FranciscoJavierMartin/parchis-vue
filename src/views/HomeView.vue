<template>
  <PageWrapper>
    <RouterLink :to="{ name: ROUTES.OFFLINE.name }" class="button yellow"> Play </RouterLink>
  </PageWrapper>
</template>

<script setup lang="ts">
import { ROUTES } from '@/constants/routes';
import PageWrapper from '@/layout/page-wrapper.vue';
</script>
