<template>
  <div class="game-profile-section">
    <div
      v-for="position in EPositionProfile"
      :key="position"
      class="game-profile-section-container"
    >
      <ProfileWrapper
        v-bind="$props"
        :position="position"
        @handle-timer="(ends) => $emit('handleTimer', ends)"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import ProfileWrapper from '@/components/game/profiles/profile-wrapper.vue';
import { EPositionProfile } from '@/constants/board';
import type { TDiceValues } from '@/interfaces/dice';
import type { IActionsTurn, TTotalPlayers } from '@/interfaces/game';
import type { IProfileHandlers, TPositionProfiles } from '@/interfaces/profile';
import type { IPlayer } from '@/interfaces/user';

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
defineEmits<{
  handleTimer: [ends: boolean, playerIndex?: number];
  handleSelectDice: [diceValue?: TDiceValues, isActionSocket?: boolean];
}>();
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
