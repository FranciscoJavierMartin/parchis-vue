<template>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    :fill="fill"
    viewBox="0 0 24 24"
    :stroke-width="strokeWidth"
    stroke="currentColor"
  >
    <path stroke-linecap="round" stroke-linejoin="round" d="M6 18 18 6M6 6l12 12" />
  </svg>
</template>

<script setup lang="ts">
import type { IconProps } from '@/interfaces/icons';

withDefaults(defineProps<IconProps>(), {
  fill: 'white',
  strokeWidth: 1.5,
});
</script>
