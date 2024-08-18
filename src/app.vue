<template>
  <AppWrapper>
    <RouterView />
  </AppWrapper>
</template>

<script setup lang="ts">
import { RouterView } from 'vue-router';
import AppWrapper from '@layouts/components/wrapper/app-wrapper/app-wrapper.vue';
</script>
