<template>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    :fill="fill"
    viewBox="0 0 24 24"
    :stroke-width="strokeWidth"
    stroke="currentColor"
  >
    <path stroke-linecap="round" stroke-linejoin="round" d="M19.5 13.5 12 21m0 0-7.5-7.5M12 21V3" />
  </svg>
</template>

<script setup lang="ts">
import type { IconProps } from '@/interfaces/icons';

withDefaults(defineProps<IconProps>(), {
  fill: 'white',
  strokeWidth: 1.5,
});
</script>
