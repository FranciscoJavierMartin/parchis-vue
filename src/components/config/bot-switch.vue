<template>
  <label :for="id" class="bot-switch">
    <input :id="id" type="checkbox" v-model="botSwitch" />
    <span class="slider" />
  </label>
</template>

<script setup lang="ts">
interface BotSwitchProps {
  id: string;
}

defineProps<BotSwitchProps>();

const botSwitch = defineModel();
</script>

<style scoped>
.bot-switch {
  position: relative;
  display: inline-block;
  width: 60px;
  height: 34px;

  .slider {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    cursor: pointer;
    background-color: #ccc;
    border-radius: 34px;
    -webkit-transition: 0.4s;
    transition: 0.4s;

    &::before {
      position: absolute;
      bottom: 4px;
      left: 4px;
      width: 26px;
      height: 26px;
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
        -webkit-transform: translateX(26px);
        -ms-transform: translateX(26px);
        transform: translateX(26px);
      }
    }

    &:focus + .slider {
      box-shadow: 0 0 1px #2196f3;
    }
  }
}
</style>
