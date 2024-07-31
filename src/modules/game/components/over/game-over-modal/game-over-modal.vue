<template>
  <dialog ref="trapRef" class="game-over-wrapper">
    <div class="game-over-options">
      <div class="game-over-container">
        <GameOverRibbon title="Well played" />
        <FirstPosition :first="first!" />
        <div class="game-over-container-others">
          <OtherPlayer v-for="player of others" :key="player.id" :player="player" />
        </div>
      </div>
      <div class="game-over-buttons">
        <MenuShare :data="dataShare">
          <template #default="{ onClick }">
            <button class="button blue" @click="onClick">
              <BaseIcon type="share" />
            </button>
          </template>
        </MenuShare>
        <button class="button yellow">
          <BaseIcon type="home" />
        </button>
      </div>
    </div>
  </dialog>
</template>

<script setup lang="ts">
import { onBeforeMount, ref } from 'vue';
import { getOrganizedRanking } from '@/modules/players/helpers/player.helpers';
import type { IPlayer } from '@players/interfaces/user';
import GameOverRibbon from '@/modules/game/components/over/game-over-ribbon/game-over-ribbon.vue';
import FirstPosition from '@/modules/game/components/over/first-position/first-position.vue';
import BaseIcon from '@common/components/icons/base-icon.vue';
import OtherPlayer from '@/modules/game/components/over/other-player/other-player.vue';
import useFocusTrap from '@/modules/common/composables/use-focus-trap/use-focus-trap';

interface GameOverProps {
  players: IPlayer[];
}

const dataShare: ShareData = {
  title: 'Parchis',
  text: "Let's play Parchis",
  url: window.location.href,
};

const props = defineProps<GameOverProps>();
const first = ref<IPlayer>();
const others = ref<IPlayer[]>();
const { trapRef } = useFocusTrap();

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

      .game-over-container-others {
        display: flex;
        gap: 15px;
        justify-content: center;
        width: 85%;
      }
    }

    .game-over-buttons {
      display: flex;
      gap: 15px;
      justify-content: center;
      width: 100%;
      margin-top: 20px;

      .button {
        display: flex;
        align-items: center;
        justify-content: center;
        width: 50px;
        height: 50px;
        border: none;
        border-radius: 10px;

        .icon-wrapper {
          width: 60%;
        }
      }
    }
  }
}
</style>
