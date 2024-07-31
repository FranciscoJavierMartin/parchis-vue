<template>
  <label :for="label" class="form-control">
    <input type="radio" :id="label" :value="value" v-model="totalPlayers" />
    {{ label }}
  </label>
</template>

<script setup lang="ts">
// TODO: Move to players module
import type { TTotalPlayers } from '@/modules/game/interfaces/game';

interface InputRadioProps {
  label: string;
  value: TTotalPlayers;
}

defineProps<InputRadioProps>();

const totalPlayers = defineModel();
</script>

<style scoped>
/* https://moderncss.dev/pure-css-custom-styled-radio-buttons/ */
.form-control {
  display: grid;
  grid-template-columns: 1em auto;
  gap: 0.5em;
  font-family: system-ui, sans-serif;
  font-size: 20px;
  font-weight: bold;
  line-height: 1.1;
  color: white;
  cursor: pointer;

  &:not(:last-child) {
    margin-right: 20px;
  }

  &:focus-within {
    color: rebeccapurple;
  }

  input[type='radio'] {
    display: grid;
    place-content: center;
    width: 1.15em;
    height: 1.15em;
    /* Not removed via appearance */
    margin: 0;

    font: inherit;
    color: currentColor;
    /* Add if not using autoprefixer */
    -webkit-appearance: none;
    /* Remove most all native input styles */
    appearance: none;
    /* For iOS < 15 */
    background-color: var(--form-background);
    border: 0.15em solid currentColor;
    border-radius: 50%;
    transform: translateY(-0.075em);

    &::before {
      width: 0.65em;
      height: 0.65em;
      content: '';
      border-radius: 50%;
      box-shadow: inset 1em 1em rebeccapurple;
      transition: 120ms transform ease-in-out;
      transform: scale(0);
      /* Windows High Contrast Mode */
      /* background-color: CanvasText; */
    }

    &:checked::before {
      transform: scale(1);
    }

    &:focus {
      /* outline: max(2px, 0.15em) solid currentColor; */
      outline-offset: max(2px, 0.15em);
    }
  }
}
</style>
