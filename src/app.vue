<template>
  <AppWrapper>
    <RouterView />
  </AppWrapper>
</template>

<script setup lang="ts">
import { onBeforeMount, watch } from 'vue';
import { RouterView } from 'vue-router';
import { useI18n } from 'vue-i18n';
import AppWrapper from '@layouts/components/wrapper/app-wrapper/app-wrapper.vue';
import { getValueFromCache, saveProperty } from '@common/helpers/storage.helper';
import { DEFAULT_LANGUAGE_CODE, OPTIONS_GAME_LANGUAGE } from '@common/constants/storage.constants';

const { locale } = useI18n();

onBeforeMount(() => {
  const localeFromCache = getValueFromCache(OPTIONS_GAME_LANGUAGE, DEFAULT_LANGUAGE_CODE);
  console.log({ localeFromCache });
  locale.value = localeFromCache;
  console.log('Locale onBeforeMount', locale.value);
});

watch(locale, (newValue) => {
  console.log('Watch', newValue);
  saveProperty(OPTIONS_GAME_LANGUAGE, newValue);
});
</script>
