<template>
  <select v-model="optionSelected">
    <option :value="-1" disabled>{{ title }}</option>
    <option v-for="{ id, label } in options" :key="id" :value="id">
      {{ label }}
    </option>
  </select>
</template>

<script setup lang="ts">
import type { IOptions } from '@debug/interfaces/debug.interface';

interface DebugSelectProps {
  title: string;
  options?: IOptions[];
  disabled?: boolean;
}

withDefaults(defineProps<DebugSelectProps>(), {
  options: [] as unknown as () => IOptions[],
});

const optionSelected = defineModel();
</script>
