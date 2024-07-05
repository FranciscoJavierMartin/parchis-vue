<template>
  <div class="flex justify-center items-center size-full">
    <div class="screen">
      <slot />
    </div>
  </div>
</template>

<script lang="ts" setup>
import useWindowResize from '@/composables/use-window-resize';

useWindowResize();
</script>
