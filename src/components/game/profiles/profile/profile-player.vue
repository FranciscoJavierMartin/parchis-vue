<template>
  <div class="game-profile" :class="[basePosition.toLowerCase(), position.toLowerCase()]">
    <div class="game-profile-dice-name">
      <ProfileImage
        :handle-interval="(ends) => handleTimer(ends)"
        :player="player"
        :position="position"
        :start-timer="actionsTurn.timerActivated"
        :handle-mute-chat="handleMuteChat"
      />
      <NameAndDice :name="player.name" :has-turn="hasTurn" :dice-available="actionsTurn.diceList" />
    </div>
  </div>
</template>

<script lang="ts" setup>
import type {
  IActionsTurn,
  IPlayer,
  THandleDoneDice,
  THandleMuteChat,
  THandleSelectDice,
  THandleTimer,
  TPositionProfile,
  TPositionProfiles,
} from '@/interfaces';
import ProfileImage from '@/components/game/profiles/profile/profile-image.vue';
import NameAndDice from '@/components/game/profiles/profile/name-and-dice.vue';

interface ProfilePlayerProps {
  basePosition: TPositionProfiles;
  hasTurn: boolean;
  player: IPlayer;
  position: TPositionProfile;
  actionsTurn: IActionsTurn;
  handleTimer: THandleTimer;
  handleSelectDice: THandleSelectDice;
  handleDoneDice: THandleDoneDice;
  handleMuteChat: THandleMuteChat;
}

const props = defineProps<ProfilePlayerProps>();
</script>

<style scoped>
.game-profile {
  position: relative;
  width: 100%;

  .game-profile-dice-name {
    display: flex;
    flex-direction: column;
    width: 100%;
  }
}
</style>
