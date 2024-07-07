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
  align-items: center;
  display: flex;
  flex-direction: column;
  height: 100%;
  justify-content: center;
  width: 100%;

  .page-wrapper-options {
    align-items: center;
    display: flex;
    justify-content: space-between;
    padding: 10px;
    position: absolute;
    top: 0;
    width: 100%;
  }
}
</style>
