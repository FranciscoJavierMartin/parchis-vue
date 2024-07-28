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
      d="M16.0258 5H18.1724L13.4825 10.5068L19 18H14.6797L11.2962 13.4553L7.42453 18H5.27648L10.2928 12.11L5 5H9.42964L12.4882 9.15395L16.0258 5ZM15.2723 16.6799H16.4619L8.78336 6.25073H7.50699L15.2723 16.6799Z"
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
