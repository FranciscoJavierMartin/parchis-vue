<template>
  <!-- eslint-disable-next-line vuejs-accessibility/form-control-has-label -->
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
  /** Title for the options */
  title: string;
  /** Options to select */
  options?: IOptions[];
  /** Disable select */
  disabled?: boolean;
}

withDefaults(defineProps<DebugSelectProps>(), {
  options: [] as unknown as () => IOptions[],
});

const optionSelected = defineModel();
</script>
