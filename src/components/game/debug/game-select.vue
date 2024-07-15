<template>
  <select v-model="optionSelected">
    <option value="-1">{{ title }}</option>
    <option v-for="{ id, label } in options" :key="id" :value="id">
      {{ label }}
    </option>
  </select>
</template>

<script setup lang="ts">
import type { IOptions } from '@/interfaces/debug';

interface GameDebugSelectProps {
  title: string;
  options?: IOptions[];
  disabled?: boolean;
}

withDefaults(defineProps<GameDebugSelectProps>(), {
  options: [] as unknown as () => IOptions[],
});

const optionSelected = defineModel();
</script>
