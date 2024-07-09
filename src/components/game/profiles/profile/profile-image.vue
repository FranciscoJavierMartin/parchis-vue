<template>
  <div class="game-profile-image">
    <GameAvatar :photo="player.photo" :name="player.name" class="game-profile-image-avatar" />
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
  height: 50px;
  width: 50px;
  background-color: black;

  .game-profile-image-avatar {
    background-color: #e4e4e4;
    border-radius: 5px;
    box-shadow:
      rgba(0, 0, 0, 0.16) 0px 1px 4px,
      rgb(51, 51, 51) 0px 0px 0px 3px;
    height: 100%;
    width: 100%;
  }
}
</style>
