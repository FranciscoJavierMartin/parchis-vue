<template>
  <label :for="id" class="input-switch">
    <input :id="id" type="checkbox" v-model="value" />
    <span class="slider" />
    <span v-if="backgroundImage" class="slider-icon" />
  </label>
</template>

<script setup lang="ts">
interface InputSwitchProps {
  /** Input id */
  id: string;
  backgroundImage?: string;
}

defineProps<InputSwitchProps>();

const value = defineModel<boolean>();
</script>

<style scoped>
.input-switch {
  position: relative;
  display: inline-block;
  width: 50px;
  height: 27px;

  .slider-icon {
    &::before {
      background-image: url('/images/bot.png');
      background-repeat: no-repeat;
      background-position: center;
      background-size: 20px;
      opacity: 0;
    }
  }

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
    -webkit-transition: 0.4s;
    transition: 0.4s;

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
      transition-duration: 1s;
      transition-property: all;
    }
  }

  input[type='checkbox'] {
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

    &:checked ~ .slider-icon {
      background-color: #2196f3;

      &::before {
        opacity: 1;
        -webkit-transform: translateX(23px);
        -ms-transform: translateX(23px);
        transform: translateX(23px);
      }
    }

    &:focus + .slider {
      box-shadow: 0 0 1px #2196f3;
    }

    &:focus ~ .slider-icon {
      box-shadow: 0 0 1px #2196f3;
    }
  }
}
</style>
