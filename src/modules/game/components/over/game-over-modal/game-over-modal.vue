<template>
  <BaseModal :show-modal="showModal">
    <div class="game-over-options">
      <div class="game-over-container">
        <GameOverRibbon :title="t('game.ribbon')" />
        <FirstPosition :first="first!" />
        <div class="game-over-container-others">
          <OtherPlayer v-for="player of others" :key="player.id" :player="player" />
        </div>
      </div>
      <div class="game-over-buttons">
        <ShareButton :data="dataShare">
          <template #default="{ onClick }">
            <button class="button blue" @click="onClick">
              <BaseIcon type="share" />
            </button>
          </template>
        </ShareButton>
        <RouterLink :to="{ name: ROUTES.HOME.name }" class="button yellow">
          <BaseIcon type="home" />
        </RouterLink>
      </div>
    </div>
  </BaseModal>
</template>

<script setup lang="ts">
import { onBeforeMount, ref } from 'vue';
import { useI18n } from 'vue-i18n';
import GameOverRibbon from '@game/components/over/game-over-ribbon/game-over-ribbon.vue';
import FirstPosition from '@game/components/over/first-position/first-position.vue';
import BaseIcon from '@common/components/icons/base-icon.vue';
import OtherPlayer from '@game/components/over/other-player/other-player.vue';
import ShareButton from '@share/components/share-button/share-button.vue';
import BaseModal from '@layouts/components/base-modal/base-modal.vue';
import type { IPlayer } from '@players/interfaces/user.interface';
import { getOrganizedRanking } from '@players/helpers/player.helper';
import { ROUTES } from '@/router/routes';

interface GameOverProps {
  /** Players info (unordered) */
  players: IPlayer[];
  /** Show modal */
  showModal: boolean;
}

const props = defineProps<GameOverProps>();

const { t } = useI18n();

const dataShare: ShareData = {
  title: 'Parchis',
  text: t('share.text'),
  url: window.location.href,
};

//#region REFS
const first = ref<IPlayer>();
const others = ref<IPlayer[]>();
//#endregion

onBeforeMount(() => {
  const rankingPlayers = getOrganizedRanking(props.players);
  first.value = rankingPlayers.first;
  others.value = rankingPlayers.others;
});
</script>

<style scoped>
.game-over-options {
  width: 100%;
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
</style>
