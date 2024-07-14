<template>
  <select :value="value" :disabled="disabled" @change="onSelect">
    <option value="">{{ title }}</option>
    <option v-for="{ id, label } in options" :key="id">{{ label }}</option>
  </select>
</template>

<script setup lang="ts">
import type { IOptions } from '@/interfaces/debug';

interface SelectProps {
  value: number | string;
  title: string;
  options?: IOptions[];
  disabled?: boolean;
  onChange: (value: number | string) => void;
}

const props = withDefaults(defineProps<SelectProps>(), {
  options: [] as unknown as () => IOptions[],
  disabled: false,
});

function onSelect(event: Event): void {
  props.onChange((event.target as unknown as { value: string }).value);
}
</script>
