<template>
  <div class="game-profile-section">
    <div
      v-for="position in EPositionProfile"
      :key="position"
      class="game-profile-section-container"
    >
      <ProfileWrapper v-bind="$props" :position="position" />
    </div>
  </div>
</template>

<script setup lang="ts">
import type {
  IActionsTurn,
  IPlayer,
  IProfileHandlers,
  TPositionProfiles,
  TTotalPlayers,
} from '@/interfaces';

import ProfileWrapper from '@/components/game/profiles/profile-wrapper.vue';
import { EPositionProfile } from '@/constants/board';

// TODO: Extract in common
interface ProfileSectionProps {
  basePosition: TPositionProfiles;
  currentTurn: number;
  players: IPlayer[];
  totalPlayers: TTotalPlayers;
  profileHandlers: IProfileHandlers;
  actionsTurn: IActionsTurn;
}

defineProps<ProfileSectionProps>();
</script>

<style scoped>
.game-profile-section {
  display: flex;
  width: 100%;
  margin: 10px;

  .game-profile-section-container {
    width: 50%;
    padding: 5px 10px;
  }
}
</style>
