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
import GameLogo from '@/modules/common/components/game-logo/game-logo.vue';
import PageWrapper from '@/modules/layout/components/wrapper/page-wrapper.vue';
import MenuOptions from '@/modules/layout/components/menu-options/menu-options.vue';
import HomeOptions from '@/modules/home/components/home-options.vue';
import HomeAlert from '@/modules/home/components/home-alert.vue';
import HomeToolbar from '@/modules/home/components/home-toolbar.vue';

const serviceError: boolean = false;
const isAuth: boolean = true;
</script>
