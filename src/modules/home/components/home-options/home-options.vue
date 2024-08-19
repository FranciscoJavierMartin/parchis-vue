<template>
  <div class="home-options">
    <RouterLink v-if="!serviceError" :to="{ name: ROUTES.ONLINE.name }" class="button blue">
      <BaseIcon type="online" />
      {{ t('home.options.online') }}
    </RouterLink>
    <RouterLink :to="{ name: ROUTES.OFFLINE.name }" class="button yellow">
      <BaseIcon type="offline" fill="#8b5f00" />
      {{ t('home.options.offline') }}
    </RouterLink>
  </div>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n';
import BaseIcon from '@common/components/icons/base-icon.vue';
import { ROUTES } from '@/router/routes';

interface HomeOptionsProps {
  /** Is there service error */
  serviceError?: boolean;
}

withDefaults(defineProps<HomeOptionsProps>(), { serviceError: false });

const { t } = useI18n();
</script>

<style scoped>
.home-options {
  display: flex;
  flex-direction: column;
  gap: 25px;
  align-items: center;
  justify-content: baseline;
  width: 80%;
  margin: 40px;
  animation: fadeInLeft 0.25s ease both;

  .button {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 65%;
    padding: 15px;
    font-size: 23px;
    font-weight: bold;
    text-align: center;
    text-decoration: none;
    text-transform: uppercase;
    border-radius: 10px;

    .icon-wrapper {
      width: 30px;
    }
  }
}
</style>
