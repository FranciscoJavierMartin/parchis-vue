<template>
  <button class="button blue menu-options-button">
    <GearIcon />
  </button>
</template>

<script setup lang="ts">
import GearIcon from '@/components/icons/gear-icon.vue';
</script>

<style scoped>
.menu-options-button {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 35px;
  height: 35px;
  border-radius: 5px;

  &:deep(svg) {
    width: 50%;
  }
}
</style>
