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
import type { IDiceList } from '@/interfaces';
import DiceFace from '@/components/game/components/dice/dice-face.vue';

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
  height: 20px;
  margin: 8px 0;
  width: 100%;

  .game-profile-dices {
    display: flex;
    align-items: center;
    gap: 5px;
  }

  .game-profile-name {
    color: white;
    font-size: 15px;
    font-weight: bold;
    opacity: 0.5;
    overflow: hidden;
    text-overflow: ellipsis;
    text-shadow: 1px 0px 3px black;
    transition: all 500ms ease;
    white-space: nowrap;
    width: 150px;

    &.has-turn {
      opacity: 1;
    }
  }
}
</style>
