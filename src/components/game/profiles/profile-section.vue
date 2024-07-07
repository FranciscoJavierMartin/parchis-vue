<template>
  <div>Profile section</div>
</template>

<script setup lang="ts">
import type {
  IActionsTurn,
  IPlayer,
  IProfileHandlers,
  TPositionProfiles,
  TTotalPlayers,
} from '@/interfaces';

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
