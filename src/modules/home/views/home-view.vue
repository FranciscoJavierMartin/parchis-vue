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
import GameLogo from '@common/components/game-logo/game-logo.vue';
import PageWrapper from '@layouts/components/wrapper/page-wrapper.vue';
import MenuOptions from '@layouts/components/menu-options/menu-options.vue';
import HomeOptions from '@/modules/home/components/home-options/home-options.vue';
import HomeAlert from '@/modules/home/components/home-alert/home-alert.vue';
import HomeToolbar from '@/modules/home/components/home-toolbar/home-toolbar.vue';

const serviceError: boolean = false;
const isAuth: boolean = true;
</script>
