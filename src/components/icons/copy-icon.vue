<template>
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    :fill="fill"
    :stroke-width="strokeWidth"
    stroke="currentColor"
  >
    <path
      stroke-linecap="round"
      stroke-linejoin="round"
      d="m6 18h-3c-.48 0-1-.379-1-1v-14c0-.481.38-1 1-1h14c.621 0 1 .522 1 1v3h3c.621 0 1 .522 1 1v14c0 .621-.522 1-1 1h-14c-.48 0-1-.379-1-1zm1.5-10.5v13h13v-13zm9-1.5v-2.5h-13v13h2.5v-9.5c0-.481.38-1 1-1z"
    />
  </svg>
</template>

<script setup lang="ts">
import type { IconProps } from '@/interfaces/icons';

withDefaults(defineProps<IconProps>(), {
  fill: 'white',
  strokeWidth: 1.5,
});
</script>
