<template>
  <label :for="id" class="option-switch">
    <input
      :id="id"
      type="checkbox"
      :value="value"
      @input="$emit('input', $event)"
      @change="$emit('change', $event)"
    />
    <span class="slider" />
  </label>
</template>

<script setup lang="ts" generic="T">
interface OptionSwitchProps {
  id: string;
  value: string | number | boolean;
}

defineProps<OptionSwitchProps>();

defineEmits<{
  (e: 'update:modelValue', value: string): void;
  (e: 'input', event: Event): void;
  (e: 'change', event: Event): void;
}>();
</script>

<style scoped>
.option-switch {
  position: relative;
  display: inline-block;
  width: 50px;
  height: 27px;

  .slider {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    cursor: pointer;
    background-color: #ccc;
    border-radius: 28px;
    -webkit-transition: 0.4s;
    transition: 0.4s;

    &::before {
      position: absolute;
      bottom: 2px;
      left: 2px;
      width: 23px;
      height: 23px;
      content: '';
      background-color: white;
      border-radius: 50%;
      -webkit-transition: 0.4s;
      transition: 0.4s;
    }
  }

  input {
    width: 0;
    height: 0;
    opacity: 0;

    &:checked + .slider {
      background-color: #2196f3;

      &::before {
        -webkit-transform: translateX(23px);
        -ms-transform: translateX(23px);
        transform: translateX(23px);
      }
    }

    &:focus + .slider {
      box-shadow: 0 0 1px #2196f3;
    }
  }
}
</style>
