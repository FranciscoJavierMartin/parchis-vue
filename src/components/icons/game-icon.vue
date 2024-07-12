<template>
  <div class="icon-wrapper" :class="[`icon-${type}`]">
    <svg :view-box="icon.viewBox" :style="svgStyles">
      <path v-for="(d, index) in icon.path" :key="index" :d="d" :fill="fill" />
    </svg>
  </div>
</template>

<script setup lang="ts">
import { computed, type CSSProperties } from 'vue';
import { iconsData, type TypeIcon } from './icon-data';

interface GameIconProps {
  type: TypeIcon;
  fill?: string;
  svgStyles?: CSSProperties;
}

const props = withDefaults(defineProps<GameIconProps>(), { fill: 'white' });

const icon = computed(() => iconsData[props.type]);
</script>
