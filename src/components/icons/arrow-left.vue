<template>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    :fill="fill"
    viewBox="0 0 24 24"
    :stroke-width="strokeWidth"
    stroke="currentColor"
  >
    <path stroke-linecap="round" stroke-linejoin="round" d="M10.5 19.5 3 12m0 0 7.5-7.5M3 12h18" />
  </svg>
</template>

<script setup lang="ts">
import type { IconProps } from '@/interfaces/icons';

withDefaults(defineProps<IconProps>(), {
  fill: 'white',
  strokeWidth: 1.5,
});
</script>
