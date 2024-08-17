<template>
  <!-- <AppWrapper>
    <RouterView />
  </AppWrapper> -->
  <div>
    <h1 style="color: white">{{ $t('main.hello') }}</h1>
  </div>
</template>

<script setup lang="ts">
import { RouterView } from 'vue-router';
import AppWrapper from '@layouts/components/wrapper/app-wrapper/app-wrapper.vue';
</script>
