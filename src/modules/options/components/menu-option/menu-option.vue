<template>
  <div class="menu-option">
    <BaseIcon :type="icon" :is-muted="!model" />
    <span class="menu-option-label">
      {{ label }}
    </span>
    <InputSwitch :id="`menu-option-${label}`" v-model="model" />
  </div>
</template>

<script setup lang="ts">
import InputSwitch from '@common/components/input-switch/input-switch.vue';
import BaseIcon from '@common/components/icons/base-icon.vue';
import type { TypeIcon } from '@common/interfaces/icons.interface';

interface MenuOptionProp {
  /** Text to show */
  label: string;
  /** Icon to show */
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
  border-bottom: 1px solid var(--light-gray);

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
