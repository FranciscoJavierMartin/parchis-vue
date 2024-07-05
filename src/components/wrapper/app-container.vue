<template>
  <div class="flex size-full items-center justify-center">
    <div class="screen">
      <slot />
    </div>
  </div>
</template>

<script lang="ts" setup>
import useWindowResize from '@/composables/use-window-resize';

useWindowResize();
</script>
