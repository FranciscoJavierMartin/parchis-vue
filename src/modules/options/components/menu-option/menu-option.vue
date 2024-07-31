<template>
  <div class="menu-option">
    <BaseIcon :type="icon" :is-muted="!model" />
    <label class="menu-option-label">
      {{ label }}
    </label>
    <OptionSwitch :id="`menu-option-${label}`" v-model="model" />
  </div>
</template>

<script setup lang="ts">
import OptionSwitch from '@/modules/options/components/option-switch/option-switch.vue';
import BaseIcon from '@common/components/icons/base-icon.vue';
import type { TypeIcon } from '@common/interfaces/icons';

interface MenuOptionProp {
  label: string;
  icon: TypeIcon;
}

defineProps<MenuOptionProp>();

const model = defineModel<boolean>();
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

  .icon-wrapper {
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
