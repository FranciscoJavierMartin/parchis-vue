<template>
  <div class="game-profile-ranking">
    <span class="game-profile-ranking-value">{{ rankingPosition }}</span>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useI18n } from 'vue-i18n';
import { getLabelRanking } from '@players/helpers/player.helper';
import type { TPlayerRankingPosition } from '@profiles/interfaces/profile.interface';

interface ProfileRankingProps {
  /** Position in ranking */
  value: TPlayerRankingPosition;
}

const props = defineProps<ProfileRankingProps>();
const { t } = useI18n();

//#region COMPUTED
const rankingPosition = computed<string>(() => t(`game.position.${getLabelRanking(props.value)}`));
//#endregion
</script>

<style scoped>
.game-profile-ranking {
  position: absolute;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 50px;
  height: 50px;
  animation: bounceIn 1s both;

  .game-profile-ranking-value {
    font-family: 'Arial Black', Gadget, sans-serif;
    font-size: 25px;
    color: #f8ea55;
    text-shadow:
      0px 0px 0 rgb(235, 221, 72),
      0px 1px 0 rgb(222, 208, 59),
      0px 2px 0 rgb(209, 195, 46),
      0px 3px 0 rgb(196, 182, 33),
      0px 4px 3px rgba(171, 99, 37, 0.27),
      0px 4px 1px rgba(171, 99, 37, 0.5),
      0px 0px 3px rgba(171, 99, 37, 0.2);
  }
}
</style>
