<template>
  <div class="icon-wrapper" :class="`icon-${type}`">
    <svg :viewBox="showIcon.viewBox">
      <path v-for="(d, key) of showIcon.path" :key="key" :d="d" :fill="fill" />
      <line v-if="isMuted" x1="24" y1="0" x2="0" y2="24" :stroke-width="2.0" stroke="white" />
    </svg>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { ICONS_DATA } from '@common/constants/icons.constants';
import type { TypeIcon } from '@common/interfaces/icons.interface';

interface GameIconProps {
  /** Icon type */
  type: TypeIcon;
  /** Fill for the icon */
  fill?: string;
  /** Add muted line */
  isMuted?: boolean;
}

const props = withDefaults(defineProps<GameIconProps>(), {
  fill: 'white',
  isMuted: false,
});

//#region COMPUTED
const showIcon = computed(() => ICONS_DATA[props.type]);
//#endregion
</script>

<style scoped>
.icon-wrapper {
  pointer-events: none;
}
</style>
