<template>
  <div class="page-wrapper">
    <div v-if="slots.leftOption || slots.rightOption" class="page-wrapper-options">
      <slot name="leftOption" />
      <slot name="rightOption" />
    </div>
    <slot />
  </div>
</template>

<script setup lang="ts">
import { useSlots } from 'vue';

const slots = useSlots();
</script>

<style scoped>
.page-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;

  .page-wrapper-options {
    position: absolute;
    top: 0;
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
    padding: 10px;
  }
}
</style>
