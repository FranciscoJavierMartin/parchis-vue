<template>
  <div class="other-player-container">
    <span class="position">{{ player.ranking }}</span>
    <PlayerAvatar :photo="player.photo || ''" :name="player.name" />
    <div class="other-player-name game-over-color" :class="[player.color.toLowerCase()]">
      {{ player.name }}
    </div>
  </div>
</template>

<script setup lang="ts">
import type { IPlayer } from '@/interfaces/user';
import PlayerAvatar from '@/components/avatar/player-avatar.vue';

interface OtherPlayerProps {
  player: IPlayer;
}

defineProps<OtherPlayerProps>();
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
    margin-top: 5px;
    overflow: hidden;
    font-size: 12px;
    font-weight: bold;
    text-align: center;
    text-overflow: ellipsis;
    text-shadow: 0px 0px 1px black;
    white-space: nowrap;
  }

  /* TODO: Share styles with first position component */
  .game-over-color.red {
    color: var(--game-red);
  }

  .game-over-color.blue {
    color: var(--game-blue);
  }

  .game-over-color.yellow {
    color: var(--game-yellow);
  }

  .game-over-color.green {
    color: var(--game-green);
  }
}
</style>
