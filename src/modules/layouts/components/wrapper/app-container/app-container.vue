<template>
  <div class="container">
    <div class="screen" id="screen">
      <slot />
      <ToastFeedback />
    </div>
  </div>
</template>

<script lang="ts" setup>
import ToastFeedback from '@toast/components/toast-feedback/toast-feedback.vue';
import useWindowResize from '@common/composables/use-window-resize/use-window-resize';

useWindowResize();
</script>

<style scoped>
.container {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
}

.screen {
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  width: var(--base-width);
  height: var(--base-height);
  overflow: hidden;
  background-color: #00a6df;
  background-image: var(--bg-image);

  @media only screen and (width <= 420px) {
    width: 100%;
    height: 100%;
  }

  @media only screen and (width <= 960px) {
    background-color: unset;
    background-image: unset;
  }
}
</style>
