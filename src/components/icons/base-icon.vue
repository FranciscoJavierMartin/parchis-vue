<template>
  <div class="icon-wrapper" :class="`icon-${type}`">
    <svg :viewBox="showIcon.viewBox">
      <path v-for="(d, key) of showIcon.path" :key="key" :d="d" :fill="fill" />
    </svg>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { ICONS_DATA } from '@/constants/icons';
import type { TypeIcon } from '@/interfaces/icons';

interface GameIconProps {
  type: TypeIcon;
  fill?: string;
}

const props = withDefaults(defineProps<GameIconProps>(), { fill: 'white' });

const showIcon = computed(() => ICONS_DATA[props.type]);
</script>

<style scoped>
.icon-wrapper {
  pointer-events: none;
}
</style>
