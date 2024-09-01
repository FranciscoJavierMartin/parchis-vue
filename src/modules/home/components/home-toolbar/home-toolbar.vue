<template>
  <div class="home-toolbar">
    <RouterLink :to="{ name: ROUTES.ABOUT.name }" class="button blue" title="About">
      <BaseIcon type="info" />
    </RouterLink>
    <ShareButton :data="dataShare">
      <template #default="{ onClick }">
        <button title="Share" class="button blue" @click="onClick">
          <BaseIcon type="share" />
        </button>
      </template>
    </ShareButton>
    <button v-if="isAuth" class="button blue" title="Logout">
      <BaseIcon type="logout" />
    </button>
  </div>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n';
import ShareButton from '@share/components/share-button/share-button.vue';
import BaseIcon from '@common/components/icons/base-icon.vue';
import { ROUTES } from '@/router/routes';

interface HomeToolbarProps {
  /** Is user authenticated */
  isAuth: boolean;
}

defineProps<HomeToolbarProps>();

const { t } = useI18n();

const dataShare: ShareData = {
  title: 'Parchis',
  text: t('share.text'),
  url: window.location.href,
};
</script>

<style scoped>
.home-toolbar {
  display: flex;
  gap: 20px;
  align-items: center;
  justify-content: center;
  width: 50%;
  margin-top: 30px;
  animation: bounceIn 0.8s ease both;

  .button {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 50px;
    height: 50px;
    border-radius: 5px;

    .icon-wrapper {
      width: 30px;
    }
  }
}
</style>
