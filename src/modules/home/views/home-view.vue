<template>
  <PageWrapper>
    <template #default>
      <!-- <GameLogo />
      <HomeOptions :serviceError="serviceError" />
      <HomeAlert v-if="serviceError" />
      <HomeToolbar :isAuth="isAuth" /> -->
      <div>
        <MyInput v-model="myName" />
        <input v-model="myName" placeholder="Name" />
        <h1>{{ myName }}</h1>
      </div>
    </template>
    <template #rightOption>
      <MenuOptions />
    </template>
  </PageWrapper>
</template>

<script setup lang="ts">
import GameLogo from '@common/components/game-logo/game-logo.vue';
import PageWrapper from '@layouts/components/wrapper/page-wrapper/page-wrapper.vue';
import MenuOptions from '@layouts/components/menu-options/menu-options.vue';
import HomeOptions from '@home/components/home-options/home-options.vue';
import HomeAlert from '@home/components/home-alert/home-alert.vue';
import HomeToolbar from '@home/components/home-toolbar/home-toolbar.vue';
import MyInput from './my-input.vue';
import { ref } from 'vue';

const serviceError: boolean = false;
const isAuth: boolean = true;

const myName = ref<string>('');
</script>
