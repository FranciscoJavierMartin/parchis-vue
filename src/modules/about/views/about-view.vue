<template>
  <PageWrapper>
    <template #leftOption>
      <BackButton />
    </template>
    <template #rightOption>
      <MenuOptions />
    </template>
    <template #default>
      <div class="about-page">
        <GameLogo />
        <div v-html="t('about.text')" />
      </div>
    </template>
  </PageWrapper>
</template>

<script setup lang="ts">
import GameLogo from '@common/components/game-logo/game-logo.vue';
import MenuOptions from '@layouts/components/menu-options/menu-options.vue';
import BackButton from '@layouts/components/back-button/back-button/back-button.vue';
import PageWrapper from '@layouts/components/wrapper/page-wrapper/page-wrapper.vue';
import { useI18n } from 'vue-i18n';

const { t } = useI18n();
</script>

<style scoped>
.about-page {
  width: 80%;
  padding: 0 25px;
  margin-top: 40px;
  background-color: rgb(0 37 78 / 60%);
  border-radius: 10px;
  box-shadow:
    rgba(0, 0, 0, 0.4) 0px 2px 4px,
    rgba(0, 0, 0, 0.3) 0px 7px 13px -3px,
    rgba(0, 0, 0, 0.2) 0px -3px 0px inset;
  animation: fadeInLeft 500ms ease both;

  :deep(p) {
    margin: 25px 0;
    font-size: 16px;
    color: white;
    text-align: justify;
  }

  :deep(a),
  :deep(a:visited) {
    font-weight: bold;
    color: white;
    text-decoration: none;
  }
}
</style>
