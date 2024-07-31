<template>
  <div class="game-profile-image">
    <div v-if="player.isOffline" class="game-profile-image-offline">Left</div>
    <PlayerAvatar :photo="player.photo" :name="player.name" class="game-profile-image-avatar" />
    <button
      v-if="showMuteChat"
      :aria-describedby="titleMuteChat"
      class="game-profile-mute-chat"
      :class="[position.toLowerCase(), { mute: player.isMuted }]"
      @click="$emit('handleMuteChat', player.index)"
    >
      <BaseIcon type="chat" />
    </button>
    <div v-if="startTimer && isRunning" class="game-profile-image-progress" />
  </div>
</template>

<script lang="ts" setup>
import { computed, ref, watch } from 'vue';
import PlayerAvatar from '@common/components/player-avatar/player-avatar.vue';
import BaseIcon from '@common/components/icons/base-icon.vue';
import { TIME_INTERVAL_CHRONOMETER } from '@/modules/game/constants/game.constants';
import type { IPlayer } from '@/modules/players/interfaces/user.interface';
import type { TPositionProfile } from '@profiles/interfaces/profile.interface';

interface ProfileImageProps {
  player: IPlayer;
  startTimer: boolean;
  position: TPositionProfile;
}

const props = defineProps<ProfileImageProps>();
const emit = defineEmits<{
  handleMuteChat: [playerIndex: number];
  handleInterval: [ends: boolean];
}>();

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
        emit('handleInterval', false);
      }

      if (newProgressIncreased === 100) {
        isRunning.value = false;
        emit('handleInterval', true);
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
  width: 50px;
  height: 50px;
  background-color: black;

  .game-profile-image-avatar {
    width: 100%;
    height: 100%;
    background-color: #e4e4e4;
    border-radius: 5px;
    box-shadow:
      rgba(0, 0, 0, 0.16) 0px 1px 4px,
      rgb(51, 51, 51) 0px 0px 0px 3px;
  }

  .game-profile-image-offline {
    position: absolute;
    top: 0;
    left: 0;
    z-index: 2;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    height: 100%;
    color: white;
    text-shadow: 1px 1px 1px black;
    text-transform: uppercase;
    background-color: #ff0000b3;
    border-radius: 5px;
    box-shadow:
      rgba(0, 0, 0, 0.4) 0px 2px 4px,
      rgba(0, 0, 0, 0.3) 0px 7px 13px -3px,
      rgba(0, 0, 0, 0.2) 0px -3px 0px inset;
    animation: bounceIn 1s both;
  }

  .game-profile-mute-chat {
    position: absolute;
    top: -5px;
    right: -5px;
    z-index: 2;
    display: flex;
    align-items: center;
    justify-content: center;
    width: 20px;
    height: 20px;
    color: white;
    cursor: pointer;
    background-color: #009688;
    border: 1px solid white;
    border-radius: 50%;
    box-shadow:
      rgba(0, 0, 0, 0.12) 0px 1px 3px,
      rgba(0, 0, 0, 0.24) 0px 1px 2px;

    .icon-wrapper {
      position: absolute;
      top: 1px;
      width: 80%;
    }

    &.right {
      right: auto;
      left: -7px;

      .icon-wrapper {
        transform: scaleX(-1);
      }
    }

    &.mute .icon-wrapper {
      background-color: #e91e63;
    }
  }

  .game-profile-image-progress {
    position: absolute;
    top: 0;
    left: 0;
    width: 50px;
    height: 50px;
    background: conic-gradient(transparent v-bind(progressDegrees), #5ab340cc 0deg);
    border-radius: 5px;
  }
}
</style>
