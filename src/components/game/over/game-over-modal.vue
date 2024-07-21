<template>
  <div class="game-over-wrapper">
    <div class="game-over-options">
      <div class="game-over-container">
        <GameOverRibbon title="Well played" />
        <FirstPosition :first="first!" />
        <div class="game-over-container-others">
          <OtherPlayer v-for="player of players" :key="player.id" :player="player" />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onBeforeMount, ref } from 'vue';
import { getOrganizedRanking } from '@/helpers/player';
import type { IPlayer } from '@/interfaces/user';
import GameOverRibbon from '@/components/game/over/game-over-ribbon.vue';
import FirstPosition from '@/components/game/over/first-position.vue';
import OtherPlayer from '@/components/game/over/other-player.vue';

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

    .game-over-container {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      width: 100%;
      padding: 35px 0 15px 0;
      background: radial-gradient(circle, rgba(160, 34, 107, 1) 16%, rgba(95, 8, 98, 1) 100%);
      border-radius: 5px;
      box-shadow:
        black 0px 0px 0px 3px,
        #be835d 0px 0px 0px 6px,
        rgb(255, 217, 19) 0px 0px 0px 9px;

      &:deep(.game-over-ribbon) {
        position: absolute;
        top: -50px;
      }
    }
  }
}
</style>
