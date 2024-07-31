<template>
  <div class="first-position-container">
    <div class="first-position-container-winner-photo">
      <WinnerCrown />
      <PlayerAvatar :photo="first.photo" :name="first.name" />
      <span class="position">{{ rankingPosition }}</span>
    </div>
    <span
      class="ranking-player-name first-position-container-name game-over-color"
      :class="[first.color.toLowerCase()]"
    >
      {{ first.name }}
    </span>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import PlayerAvatar from '@common/components/player-avatar/player-avatar.vue';
import WinnerCrown from '@common/components/icons/winner-crown.vue';
import { getLabelRanking } from '@players/helpers/player';
import type { IPlayer } from '@players/interfaces/user';

interface FirstPositionProps {
  first: IPlayer;
}

const props = defineProps<FirstPositionProps>();

const rankingPosition = computed<string>(() => getLabelRanking(props.first.ranking));
</script>

<style scoped>
.first-position-container {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 85%;
  padding: 20px 0;
  margin-bottom: 15px;
  background-color: #90367c;
  border-radius: 5px;
  box-shadow:
    rgba(50, 50, 93, 0.25) 0px 13px 27px -5px,
    rgba(0, 0, 0, 0.3) 0px 8px 16px -8px;

  .first-position-container-winner-photo {
    position: relative;

    .winner-crown {
      position: absolute;
      top: -36px;
      left: 5px;
      z-index: 1;
      width: 45px;
      height: 45px;
    }

    &:deep(img) {
      width: 55px;
      height: 55px;
      border-radius: 50%;
      box-shadow:
        rgba(0, 0, 0, 0.16) 0px 1px 4px,
        rgb(51, 51, 51) 0px 0px 0px 3px;
    }

    .position {
      position: absolute;
      right: -30px;
      font-size: 18px;
      color: yellow;
    }
  }

  .first-position-container-name {
    width: 200px;
    font-size: 15px;
  }
}
</style>
