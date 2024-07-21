<template>
  <div class="game-over-wrapper">
    <div class="game-over-options">
      <div class="game-over-container">
        <GameOverRibbon title="Well played" />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onBeforeMount, ref } from 'vue';
import { getOrganizedRanking } from '@/helpers/player';
import type { IPlayer } from '@/interfaces/user';
import GameOverRibbon from '@/components/game/over/game-over-ribbon.vue';

interface GameOverProps {
  players: IPlayer[];
}

const props = defineProps<GameOverProps>();
const first = ref<IPlayer>();
const others = ref<IPlayer[]>();

onBeforeMount(() => {
  const rankingPlayers = getOrganizedRanking(props.players);
  first.value = rankingPlayers.first;
  others.value = rankingPlayers.others;
});
</script>

<style scoped>
.game-over-wrapper {
  position: absolute;
  top: 0;
  left: 0;
  z-index: 20;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  background: rgb(0 0 0 / 80%);

  .game-over-options {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 75%;
    animation: fadeInLeft 500ms ease both;

    /* .game-over-container {
    } */
  }
}
</style>
