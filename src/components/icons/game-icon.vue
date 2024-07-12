<template>
  <div class="icon-wrapper" :class="[`icon-${type}`]">
    <svg :view-box="icon.viewBox">
      <path v-for="(d, index) in icon.path" :key="index" :d="d" :fill="fill" />
    </svg>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { iconsData, type TypeIcon } from './icon-data';

interface GameIconProps {
  type: TypeIcon;
  fill?: string;
}

const props = withDefaults(defineProps<GameIconProps>(), { fill: 'white' });

const icon = computed(() => iconsData[props.type]);
</script>
