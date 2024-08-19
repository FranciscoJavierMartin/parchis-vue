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
  locale.value = localeFromCache;
});

watch(locale, (newValue) => {
  saveProperty(OPTIONS_GAME_LANGUAGE, newValue);
});
</script>
