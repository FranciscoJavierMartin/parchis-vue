<template>
  <div class="game-profile-image">
    <GameAvatar :photo="player.photo" :name="player.name" />
  </div>
</template>

<script lang="ts" setup>
import GameAvatar from '@/components/avatar/game-avatar.vue';
import type { IPlayer, THandleMuteChat, TPositionProfile } from '@/interfaces';

interface ProfileImageProps {
  player: IPlayer;
  startTimer: boolean;
  position: TPositionProfile;
  handleMuteChat: THandleMuteChat;
  handleInterval: (ends: boolean) => void;
}

const props = defineProps<ProfileImageProps>();
</script>

<style scoped>
.game-profile-image {
  position: relative;
  /* height: 50px; */
  /* width: 50px; */
  /* background-color: black; */
}
</style>
