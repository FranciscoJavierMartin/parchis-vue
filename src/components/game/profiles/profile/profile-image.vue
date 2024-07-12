<template>
  <div class="game-profile-image">
    <div v-if="player.isOffline" class="game-profile-image-offline">Left</div>
    <GameAvatar :photo="player.photo" :name="player.name" class="game-profile-image-avatar" />
    <button
      v-if="showMuteChat"
      :aria-describedby="titleMuteChat"
      class="game-profile-mute-chat"
      :class="[position.toLowerCase(), { mute: player.isMuted }]"
      @click="() => handleMuteChat(player.index)"
    >
      <GameIcon type="chat" :svg-styles="{ height: '20px', width: '20px', scale: 0.7 }" />
    </button>
    <div v-if="startTimer && isRunning" class="game-profile-image-progress" />
  </div>
</template>

<script lang="ts" setup>
import { computed, ref, watch } from 'vue';
import GameAvatar from '@/components/avatar/game-avatar.vue';
import type { IPlayer, THandleMuteChat, TPositionProfile } from '@/interfaces';
import { TIME_INTERVAL_CHRONOMETER } from '@/utils/constants';
import GameIcon from '@/components/icons/game-icon.vue';

interface ProfileImageProps {
  player: IPlayer;
  startTimer: boolean;
  position: TPositionProfile;
  handleMuteChat: THandleMuteChat;
  handleInterval: (ends: boolean) => void;
}

const props = defineProps<ProfileImageProps>();
const progress = ref<number>(1);
const isRunning = ref<boolean>(false);

const progressDegrees = computed<string>(() => `${Math.round(360 * (progress.value / 100))}deg`);
const titleMuteChat = computed<string>(() =>
  props.player.isMuted ? 'Enable chat messages' : 'Mute chat messages',
);
const showMuteChat = computed<boolean>(
  () => !!(props.player.isOnline && props.player.index !== 0 && !props.player.isOffline),
);

watch(
  () => props.startTimer,
  (startTimer) => {
    isRunning.value = startTimer;
    progress.value = 1;
  },
  { immediate: true },
);

watch(
  [progress, isRunning],
  ([newProgress, newIsRunning]) => {
    if (newIsRunning) {
      const newProgressIncreased = newProgress + 1;

      // When it is a bot
      if (newProgress === 15) {
        props.handleInterval(false);
      }

      if (newProgressIncreased === 100) {
        isRunning.value = false;
        props.handleInterval(true);
      }

      setTimeout(() => {
        progress.value = newProgressIncreased;
      }, TIME_INTERVAL_CHRONOMETER);
    }
  },
  { immediate: true },
);
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

  .game-profile-image-offline {
    align-items: center;
    animation: bounceIn 1s both;
    background-color: #ff0000b3;
    border-radius: 5px;
    box-shadow:
      rgba(0, 0, 0, 0.4) 0px 2px 4px,
      rgba(0, 0, 0, 0.3) 0px 7px 13px -3px,
      rgba(0, 0, 0, 0.2) 0px -3px 0px inset;
    color: white;
    display: flex;
    height: 100%;
    justify-content: center;
    left: 0;
    position: absolute;
    text-shadow: 1px 1px 1px black;
    text-transform: uppercase;
    top: 0;
    width: 100%;
    z-index: 2;
  }

  .game-profile-mute-chat {
    background-color: transparent;
    border: none;
    cursor: pointer;
    height: 50px;
    left: 0;
    position: absolute;
    top: 0;
    width: 50px;
    z-index: 2;

    .icon-wrapper {
      align-items: center;
      background-color: #009688;
      border-radius: 50%;
      border: 1px solid white;
      box-shadow:
        rgba(0, 0, 0, 0.12) 0px 1px 3px,
        rgba(0, 0, 0, 0.24) 0px 1px 2px;
      display: flex;
      height: 20px;
      justify-content: center;
      position: absolute;
      right: -5px;
      top: -5px;
      width: 20px;

      svg {
        width: 65%;
      }
    }

    &.right .icon-wrapper {
      left: -5px;
    }

    &.left .icon-wrapper {
      transform: scaleX(-1);
    }

    &.mute .icon-wrapper {
      background-color: #e91e63;
    }
  }

  .game-profile-image-progress {
    background: conic-gradient(transparent v-bind(progressDegrees), #5ab340cc 0deg);
    border-radius: 5px;
    height: 50px;
    left: 0;
    position: absolute;
    top: 0;
    width: 50px;
  }
}
</style>
