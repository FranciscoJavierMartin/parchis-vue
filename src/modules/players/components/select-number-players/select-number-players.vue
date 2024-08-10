<template>
  <div class="game-select-number-players">
    <InputRadio
      v-for="total of numberPlayers"
      :key="total"
      :value="total"
      :label="`${total}P`"
      v-model="totalPlayers"
    />
  </div>
</template>

<script setup lang="ts">
import InputRadio from '@players/components/input-radio/input-radio.vue';
import type { TTotalPlayers } from '@game/interfaces/game.interface';

interface SelectNumberPlayersProps {
  /** Options to select */
  numberPlayers?: TTotalPlayers[];
}

withDefaults(defineProps<SelectNumberPlayersProps>(), { numberPlayers: () => [2, 3, 4] });

const totalPlayers = defineModel();
</script>

<style scoped>
.game-select-number-players {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  padding: 10px;
  margin: 20px 0;
}
</style>
