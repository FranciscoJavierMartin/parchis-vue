<template>
  <div>{{ basePosition }} - {{ position }} - {{ player.name }}</div>
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

defineProps<ProfilePlayerProps>();
</script>
