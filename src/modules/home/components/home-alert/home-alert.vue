<template>
  <div class="home-alert">
    <BaseIcon type="info" fill="#856404" />
    <span v-html="t('home.alert')" />
  </div>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n';
import BaseIcon from '@common/components/icons/base-icon.vue';

const { t } = useI18n();
</script>

<style scoped>
.home-alert {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 80%;
  padding: 5px;
  color: #856404;
  background-color: #fff3cd;
  border: 2px solid #ffeeba;
  border-radius: 10px;
  box-shadow:
    rgba(0, 0, 0, 0.16) 0px 3px 6px,
    rgba(0, 0, 0, 0.23) 0px 3px 6px;

  .icon-wrapper {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 40px;
    height: 40px;
    margin-right: 5px;
  }
}
</style>
