<template>
  <div class="game-profile" :class="[basePosition.toLowerCase(), position.toLowerCase()]">
    <div class="game-profile-dice-name">
      <ProfileImage
        :player="player"
        :position="position"
        :start-timer="actionsTurn.timerActivated"
        @handle-mute-chat="(playerIndex: number) => $emit('handleMuteChat', playerIndex)"
        @handle-interval="(ends: boolean) => $emit('handleTimer', ends)"
      />
      <NameAndDice :name="player.name" :has-turn="hasTurn" :dice-available="actionsTurn.diceList" />
    </div>
    <ProfileDice
      v-if="hasTurn"
      :disabled-dice="actionsTurn.disabledDice"
      :show-dice="actionsTurn.showDice"
      :dice-roll-number="actionsTurn.diceRollNumber"
      :value="actionsTurn.diceValue"
      @handle-done-dice="(isActionSocket?: boolean) => $emit('handleDoneDice', isActionSocket)"
      @handle-select-dice="
        (diceValue?: TDiceValues, isActionSocket?: boolean) =>
          $emit('handleSelectDice', diceValue, isActionSocket)
      "
    />
    <ProfileRanking v-if="player.finished" :value="player.ranking" />
  </div>
</template>

<script lang="ts" setup>
import ProfileImage from '@profiles/components/profile-image/profile-image.vue';
import ProfileDice from '@profiles/components/profile-dice/profile-dice.vue';
import NameAndDice from '@profiles/components/name-and-dice/name-and-dice.vue';
import ProfileRanking from '@profiles/components/profile-ranking/profile-ranking.vue';
import type { TPositionProfile, TPositionProfiles } from '@profiles/interfaces/profile.interface';
import type { IPlayer } from '@players/interfaces/user.interface';
import type { IActionsTurn } from '@game/interfaces/game.interface';
import type { TDiceValues } from '@dice/interfaces/dice.interface';

interface ProfilePlayerProps {
  /** Position on screen (top or bottom) */
  basePosition: TPositionProfiles;
  /** Has player current turn */
  hasTurn: boolean;
  /** Player info */
  player: IPlayer;
  /** Position on screen (left or right) */
  position: TPositionProfile;
  /** Actions in turn data */
  actionsTurn: IActionsTurn;
}

defineProps<ProfilePlayerProps>();
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

    &:deep(.game-profile-dices) {
      flex-direction: row-reverse;
    }

    &:deep(.game-profile-name-dice) {
      justify-content: flex-end;
    }

    &:deep(.game-profile-name) {
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
