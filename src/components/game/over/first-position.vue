<template>
  <div class="first-position-container">
    <div class="first-position-container-winner-photo">
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
import type { IPlayer } from '@/interfaces/user';

interface FirstPositionProps {
  first: IPlayer;
}

defineProps<FirstPositionProps>();
</script>

<style scoped>
.first-position {
}
</style>
