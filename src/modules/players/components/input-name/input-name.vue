<template>
  <input
    :disabled="disabled"
    maxlength="20"
    required
    v-model="playerName"
    class="game-offline-input-name"
  />
</template>

<script lang="ts" setup>
import { sanizateTags } from '@players/helpers/player.helper';

interface InputNameProps {
  /** Disable input */
  disabled: boolean;
}

defineProps<InputNameProps>();

const playerName = defineModel<string>({
  set(value: string): string {
    return sanizateTags(value);
  },
});
</script>

<style scoped>
.game-offline-input-name {
  width: 55%;
  padding: 5px;
  font-size: 20px;
  border: 1px solid white;
  border-radius: 5px;
  box-shadow:
    rgba(0, 0, 0, 0.25) 0px 0.0625em 0.0625em,
    rgba(0, 0, 0, 0.25) 0px 0.125em 0.5em,
    rgba(255, 255, 255, 0.1) 0px 0px 0px 1px inset;
}
</style>
