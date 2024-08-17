<template>
  <!-- <AppWrapper>
    <RouterView />
  </AppWrapper> -->
  <div>
    <h1 style="color: white">{{ t('main.hello') }}</h1>
    <select v-model="locale">
      <option v-for="(lang, i) in langs" :key="`Lang${i}`" :value="lang.code">
        {{ lang.text }}
      </option>
    </select>
  </div>
</template>

<script setup lang="ts">
import { RouterView } from 'vue-router';
import AppWrapper from '@layouts/components/wrapper/app-wrapper/app-wrapper.vue';
import { ref } from 'vue';
import { useI18n } from 'vue-i18n';
const { t, locale } = useI18n();

const langs = ref([
  { code: 'en', text: 'English' },
  { code: 'es', text: 'Spanish' },
]);
</script>
