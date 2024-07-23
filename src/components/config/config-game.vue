<template>
  <div></div>
</template>

<script setup lang="ts">
import type { DataOfflineGame } from '@/interfaces/game';

interface ConfigGameProps {}

defineProps<ConfigGameProps>();

defineEmits<{
  updateData: [data: DataOfflineGame];
}>();
</script>
