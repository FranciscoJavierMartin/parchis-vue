<template>
  <label :aria-label="t(label)" :for="id" class="input-switch">
    <input :id="id" type="checkbox" v-model="value" :disabled="disabled" />
    <span class="slider" />
    <span
      v-if="icon"
      class="slider-icon"
      :style="{
        '--background-icon': `url(${icon})`,
      }"
    />
  </label>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n';

interface InputSwitchProps {
  /** ARIA label */
  label: string;
  /** Input id */
  id: string;
  /** Icon to use */
  icon?: string;
  /** Disable input */
  disabled?: boolean;
}

defineProps<InputSwitchProps>();

const { t } = useI18n();

const value = defineModel<boolean>();
</script>

<style scoped>
.input-switch {
  position: relative;
  display: inline-block;
  width: 50px;
  height: 27px;

  .slider,
  .slider-icon {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    cursor: pointer;
    background-color: #ccc;
    border-radius: 28px;
    transition-duration: 0.5s;
    transition-property: background-color;

    &::before {
      position: absolute;
      bottom: 2px;
      left: 2px;
      z-index: 2;
      width: 23px;
      height: 23px;
      content: '';
      background-color: white;
      border-radius: 50%;
      transition-duration: 0.5s;
      transition-property: opacity, transform;
    }
  }

  .slider-icon {
    &::before {
      background-image: var(--background-icon);
      background-repeat: no-repeat;
      background-position: center;
      background-size: 20px;
      opacity: 0;
    }
  }

  input[type='checkbox'] {
    width: 0;
    height: 0;
    opacity: 0;

    &:checked + .slider,
    &:checked ~ .slider-icon {
      background-color: #2196f3;

      &::before {
        -webkit-transform: translateX(23px);
        -ms-transform: translateX(23px);
        transform: translateX(23px);
      }
    }

    &:checked ~ .slider-icon::before {
      opacity: 1;
    }

    &:focus + .slider,
    &:focus ~ .slider-icon {
      box-shadow: 0 0 1px #2196f3;
    }
  }
}
</style>
