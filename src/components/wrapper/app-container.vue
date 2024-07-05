<template>
  <div class="container">
    <div class="screen">
      <slot />
    </div>
  </div>
</template>

<script lang="ts" setup>
import useWindowResize from '@/composables/use-window-resize';

useWindowResize();
</script>

<style scoped>
.container {
  align-items: center;
  display: flex;
  height: 100%;
  justify-content: center;
  width: 100%;
}

.screen {
  align-items: center;
  background-color: #00a6df;
  background-image: var(--bg-image);
  display: flex;
  height: var(--base-height);
  justify-content: center;
  overflow: hidden;
  position: relative;
  width: var(--base-width);
}
</style>
