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
import { EPositionProfile } from '@/utils/constants';
import ProfileWrapper from '@/components/game/profiles/profile-wrapper.vue';

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
  margin: 10px;
  width: 100%;

  .game-profile-section-container {
    padding: 5px 10px;
    width: 50%;
  }
}
</style>
