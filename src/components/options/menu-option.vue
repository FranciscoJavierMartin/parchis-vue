<template>
  <div class="menu-option">
    <component :is="value ? icon : mutedIcon" fill="none" />
    <label class="menu-option-label">
      {{ label }}
    </label>
    <OptionSwitch :id="`menu-option-${label}`" :value="value" @input="$emit('input', $event)" />
  </div>
</template>

<script setup lang="ts">
import { type Component, type Raw } from 'vue';
import OptionSwitch from '@/components/options/option-switch.vue';

interface MenuOptionProp {
  label: string;
  icon: Raw<Component>;
  mutedIcon: Raw<Component>;
  value: boolean;
}

defineProps<MenuOptionProp>();

defineEmits<{
  input: [event: Event];
}>();
</script>

<style scoped>
.menu-option {
  display: flex;
  align-items: center;
  width: 100%;
  padding-bottom: 15px;
  color: white;
  border-bottom: 1px solid #8c8792;

  &:not(:first-child) {
    margin-top: 20px;
  }

  &:deep(svg) {
    width: 40px;
    height: 40px;
  }

  .menu-option-label {
    width: 60%;
    margin: 0 15px;
    font-size: 30px;
    font-weight: bold;
    text-transform: capitalize;
  }
}
</style>
