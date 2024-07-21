<template>
  <div class="other-player-container">
    <span>{{ player.ranking }}</span>
    <PlayerAvatar :photo="player.photo || ''" :name="player.name" />
    <div class="game-over-color" :class="[player.color.toLowerCase()]"></div>
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
}
</style>
