<template>
  <Suspense>
    <RouterView />
    <template #fallback>
      <LoadingIndicator />
    </template>
  </Suspense>
</template>

<script setup lang="ts">
import { RouterView } from 'vue-router';
import LoadingIndicator from '@/components/common/loading-indicator.vue';
</script>
