<template>
  <div class="game-profile-section">
    <div
      v-for="position in EPositionProfile"
      :key="position"
      class="game-profile-section-container"
    >
      <ProfileCard v-bind="$props" :position="position" />
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
import ProfileCard from '@/components/game/profiles/profile-card.vue';

// TODO: Extract in common
interface ProfileSectionProps {
  basePosition: TPositionProfiles;
  currentTurn: number;
  players: IPlayer[];
  totalPlayers: TTotalPlayers;
  profileHandlers: IProfileHandlers;
  // actionsTurn: IActionsTurn;
}

defineProps<ProfileSectionProps>();
</script>

<style scoped>
.game-profile-section {
  display: flex;
  margin: 10px;
  width: 100%;
  border: 1px solid red;

  .game-profile-section-container {
    padding: 5px 10px;
    width: 50%;
    border: 1px solid blue;
  }
}
</style>
