<template>
  <div class="game-profile-name-dice">
    <div v-if="diceAvailable.length" class="game-profile-dices">
      <DiceFace
        v-for="{ key, value } in diceAvailable"
        :key="key"
        :value="value"
        :size="16"
        animate
      />
    </div>
    <div v-else class="game-profile-name" :class="{ 'has-turn': hasTurn }">
      {{ name }}
    </div>
  </div>
</template>

<script setup lang="ts">
import DiceFace from '@/components/game/dice/dice-face.vue';
import type { IDiceList } from '@/interfaces/dice';

interface NameAndDiceProps {
  name: string;
  diceAvailable: IDiceList[];
  hasTurn: boolean;
}

defineProps<NameAndDiceProps>();
</script>

<style scoped>
.game-profile-name-dice {
  display: flex;
  width: 100%;
  height: 20px;
  margin: 8px 0;

  .game-profile-dices {
    display: flex;
    gap: 5px;
    align-items: center;
  }

  .game-profile-name {
    width: 150px;
    overflow: hidden;
    font-size: 15px;
    font-weight: bold;
    color: white;
    text-overflow: ellipsis;
    text-shadow: 1px 0px 3px black;
    white-space: nowrap;
    opacity: 0.5;
    transition: all 500ms ease;

    &.has-turn {
      opacity: 1;
    }
  }
}
</style>
