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
        @handle-timer="(ends: boolean) => $emit('handleTimer', ends)"
        @handle-select-dice="
          (diceValue?: TDiceValues, isActionSocket?: boolean) =>
            $emit('handleSelectDice', diceValue, isActionSocket)
        "
        @handle-done-dice="(isActionSocket?: boolean) => $emit('handleDoneDice', isActionSocket)"
        @handle-mute-chat="(playerIndex: number) => $emit('handleMuteChat', playerIndex)"
      />
    </div>
  </div>
</template>

<script setup lang="ts">
import ProfileWrapper from '@profiles/layouts/profile-wrapper/profile-wrapper.vue';
import { EPositionProfile } from '@board/interfaces/board.enum';
import type { TDiceValues } from '@dice/interfaces/dice.interface';
import type { IProfilesData } from '@profiles/interfaces/profile.interface';

interface ProfileSectionProps extends IProfilesData {}

defineProps<ProfileSectionProps>();
defineEmits<{
  /** When interval is finished */
  handleTimer: [ends: boolean, playerIndex?: number];
  /** When press dice */
  handleSelectDice: [diceValue?: TDiceValues, isActionSocket?: boolean];
  /** When roll dice is done */
  handleDoneDice: [isActionSocket?: boolean];
  /** Mute chat */
  handleMuteChat: [playerIndex: number];
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
