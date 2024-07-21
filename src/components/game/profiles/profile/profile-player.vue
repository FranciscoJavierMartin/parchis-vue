<template>
  <div class="game-profile" :class="[basePosition.toLowerCase(), position.toLowerCase()]">
    <div class="game-profile-dice-name">
      <ProfileImage
        :player="player"
        :position="position"
        :start-timer="actionsTurn.timerActivated"
        @handle-mute-chat="handleMuteChat"
        @handle-interval="(ends) => $emit('handleTimer', ends)"
      />
      <NameAndDice :name="player.name" :has-turn="hasTurn" :dice-available="actionsTurn.diceList" />
    </div>
    <ProfileDice
      v-if="hasTurn"
      :disabled-dice="actionsTurn.disabledDice"
      :show-dice="actionsTurn.showDice"
      :dice-roll-number="actionsTurn.diceRollNumber"
      :value="actionsTurn.diceValue"
      @handle-done-dice="$emit('handleDoneDice')"
      @handle-select-dice="$emit('handleSelectDice')"
    />
    <ProfileRanking v-if="player.finished" :value="player.ranking" />
  </div>
</template>

<script lang="ts" setup>
import ProfileImage from '@/components/game/profiles/profile/profile-image.vue';
import ProfileDice from '@/components/game/profiles/profile/profile-dice.vue';
import NameAndDice from '@/components/game/profiles/profile/name-and-dice.vue';
import ProfileRanking from '@/components/game/profiles/profile/profile-ranking.vue';
import type { THandleMuteChat, TPositionProfile, TPositionProfiles } from '@/interfaces/profile';
import type { IPlayer } from '@/interfaces/user';
import type { IActionsTurn } from '@/interfaces/game';
import type { TDiceValues } from '@/interfaces/dice';

interface ProfilePlayerProps {
  basePosition: TPositionProfiles;
  hasTurn: boolean;
  player: IPlayer;
  position: TPositionProfile;
  actionsTurn: IActionsTurn;
  handleMuteChat: THandleMuteChat;
}

defineProps<ProfilePlayerProps>();
defineEmits<{
  handleTimer: [ends: boolean, playerIndex?: number];
  handleSelectDice: [diceValue?: TDiceValues, isActionSocket?: boolean];
  handleDoneDice: [isActionSocket?: boolean];
}>();
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

  &.top {
    .game-profile-ranking {
      top: 0;
    }
  }

  &.bottom {
    .game-profile-dice-name {
      flex-direction: column-reverse;
    }

    .game-profile-dice {
      top: 30px;
    }

    .game-profile-ranking {
      top: 36px;
    }
  }

  &.right {
    .game-profile-dice-name {
      align-items: flex-end;
    }

    .game-profile-ranking {
      right: 55px;
    }

    :deep(.game-profile-dices) {
      flex-direction: row-reverse;
    }

    :deep(.game-profile-name-dice) {
      justify-content: flex-end;
    }

    :deep(.game-profile-name) {
      text-align: right;
    }
  }

  &.left {
    .game-profile-ranking {
      left: 55px;
    }
  }
}
</style>
