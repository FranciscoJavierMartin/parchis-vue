<template>
  <div class="other-player-container">
    <span class="position">{{ rankingPosition }}</span>
    <PlayerAvatar :photo="player.photo" :name="player.name" />
    <span
      class="ranking-player-name other-player-name game-over-color"
      :class="[player.color.toLowerCase()]"
    >
      {{ player.name }}
    </span>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useI18n } from 'vue-i18n';
import type { IPlayer } from '@players/interfaces/user.interface';
import PlayerAvatar from '@common/components/player-avatar/player-avatar.vue';
import { getLabelRanking } from '@players/helpers/player.helper';

interface OtherPlayerProps {
  /** Player info */
  player: IPlayer;
}

const props = defineProps<OtherPlayerProps>();

const { t } = useI18n();

//#region COMPUTED
const rankingPosition = computed<string>(() =>
  t(`game.position.${getLabelRanking(props.player.ranking)}`),
);
//#endregion
</script>

<style scoped>
.other-player-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100px;

  .position {
    margin-bottom: 5px;
    font-size: 12px;
    color: white;
  }

  &:deep(img) {
    width: 35px;
    height: 35px;
    border-radius: 50%;
    box-shadow:
      rgba(0, 0, 0, 0.16) 0px 1px 4px,
      rgb(51, 51, 51) 0px 0px 0px 3px;
  }

  .other-player-name {
    width: 80px;
    font-size: 12px;
    font-weight: bold;
  }
}
</style>
