<template>
  <div
    :style="{
      position: 'absolute',
      left: `${coordinate.x}px`,
      top: `${coordinate.y}px`,
      border: '1px solid black',
      height: 'var(--size-tile)',
      width: 'var(--size-tile)',
      backgroundColor: 'rgb(0 0 0 / 60%)',
      color: 'white',
      zIndex: 10,
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
    }"
  >
    {{ index }}
  </div>
</template>

<script setup lang="ts">
import type { IPositionsItems } from '@/interfaces';

defineProps<IPositionsItems>();
</script>
