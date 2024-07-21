<template>
  <div class="first-position-container">
    <div class="first-position-container-winner-photo">
      <WinnerCrown />
      <PlayerAvatar :photo="first.photo || ''" :name="first.name" />
      <span>{{ first.ranking }}</span>
    </div>
    <div class="first-position-container-name game-over-color" :class="[first.color.toLowerCase()]">
      {{ first.name }}
    </div>
  </div>
</template>

<script setup lang="ts">
import PlayerAvatar from '@/components/avatar/player-avatar.vue';
import WinnerCrown from '@/components/icons/winner-crown.vue';
import type { IPlayer } from '@/interfaces/user';

interface FirstPositionProps {
  first: IPlayer;
}

defineProps<FirstPositionProps>();
</script>

<style scoped>
.first-position-container {
  align-items: center;
  background-color: #90367c;
  border-radius: 5px;
  box-shadow:
    rgba(50, 50, 93, 0.25) 0px 13px 27px -5px,
    rgba(0, 0, 0, 0.3) 0px 8px 16px -8px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-bottom: 15px;
  padding: 20px 0;
  width: 85%;

  .first-position-container-winner-photo {
    position: relative;

    &:deep(svg) {
      position: absolute;
      width: 45px;
      height: 45px;
      top: -36px;
      left: 5px;
      z-index: 1;
    }

    &:deep(img) {
      border-radius: 50%;
      box-shadow:
        rgba(0, 0, 0, 0.16) 0px 1px 4px,
        rgb(51, 51, 51) 0px 0px 0px 3px;
      height: 55px;
      width: 55px;
    }

    span {
      position: absolute;
      color: yellow;
      font-size: 18px;
      right: -30px;
    }
  }

  .first-position-container-name {
    font-size: 13px;
    margin-top: 5px;
    overflow: hidden;
    text-align: center;
    text-overflow: ellipsis;
    text-shadow: 0px 0px 1px black;
    text-transform: uppercase;
    white-space: nowrap;
    width: 200px;

    &.game-over-color.red {
      color: var(--game-red);
    }

    &.game-over-color.blue {
      color: var(--game-blue);
    }

    &.game-over-color.yellow {
      color: var(--game-yellow);
    }

    &.game-over-color.green {
      color: var(--game-green);
    }
  }
}
</style>
