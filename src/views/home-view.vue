<template>
  <PageWrapper>
    <template #default>
      <GameLogo />
      <HomeOptions :serviceError="serviceError" />
      <HomeAlert v-if="serviceError" />
      <HomeToolbar :isAuth="isAuth" />
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
import HomeOptions from '@/components/home/home-options.vue';
import HomeAlert from '@/components/home/home-alert.vue';
import HomeToolbar from '@/components/home/home-toolbar.vue';

const serviceError: boolean = false;
const isAuth: boolean = true;
</script>
