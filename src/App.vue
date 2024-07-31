<template>
  <AppWrapper>
    <RouterView />
  </AppWrapper>
</template>

<script setup lang="ts">
import { RouterView } from 'vue-router';
import AppWrapper from '@/modules/layout/components/wrapper/app-wrapper.vue';
</script>
