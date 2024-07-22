<template>
  <PageWrapper>
    <RouterLink :to="{ name: ROUTES.HOME.name }" class="button yellow"> Home </RouterLink>
  </PageWrapper>
</template>

<script setup lang="ts">
import { ROUTES } from '@/constants/routes';
import PageWrapper from '@/layout/page-wrapper.vue';
</script>
