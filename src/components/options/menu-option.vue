<template>
  <div class="menu-option">
    <div class="menu-option-label">
      {{ label }}
    </div>
    <OptionSwitch v-model="model" :id="`menu-option-${label}`" />
  </div>
</template>

<script setup lang="ts">
import OptionSwitch from '@/components/options/option-switch.vue';

interface MenuOptionProp {
  label: string;
  icon: string;
}

defineProps<MenuOptionProp>();

const model = defineModel();
</script>

<style scoped>
.menu-option {
  display: flex;
  align-items: center;
  width: 100%;
  padding-bottom: 15px;
  border-bottom: 1px solid #8c8792;

  &:not(:first-child) {
    margin-top: 20px;
  }

  .menu-option-label {
    width: 60%;
    margin: 0 15px;
    font-size: 30px;
    font-weight: bold;
    color: white;
    text-transform: capitalize;
  }
}
</style>
