<template>
  <div class="home-options">
    <RouterLink :to="{ name: ROUTES.ONLINE.name }" class="button blue">
      <LinkIcon fill="#8b5f00" />
      Play online
    </RouterLink>
    <RouterLink :to="{ name: ROUTES.OFFLINE.name }" class="button yellow">
      <LinkIcon fill="#8b5f00" />
      Play offline
    </RouterLink>
  </div>
</template>

<script setup lang="ts">
import { ROUTES } from '@/constants/routes';
import LinkIcon from '@/components/icons/link-icon.vue';

interface HomeOptionsProps {
  serviceError?: boolean;
}

withDefaults(defineProps<HomeOptionsProps>(), { serviceError: false });
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
    text-decoration: none;
    text-transform: uppercase;
    border-radius: 10px;

    &:deep(svg) {
      width: 30px;
    }
  }
}
</style>
