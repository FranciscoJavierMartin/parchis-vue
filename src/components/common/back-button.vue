<template>
  <div>Back button</div>
</template>

<script setup lang="ts">
import type { TRoutesName } from '@/interfaces/routes';

interface BackButtonProps {
  to?: TRoutesName;
}

defineProps<BackButtonProps>();
</script>
