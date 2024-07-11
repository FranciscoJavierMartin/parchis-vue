<template>
  <div class="game-profile-dice" :class="{ hide: !showDice }">
    <button class="game-profile-dice-button" :disabled="disabledDice">
      <Dice3d :dice-value="0" :size="45" />
    </button>
  </div>
</template>

<script setup lang="ts">
import type { TDiceValues } from '@/interfaces';
import Dice3d from '@/components/game/components/dice/dice-3d.vue';

interface ProfileDiceProps {
  disabledDice: boolean;
  showDice: boolean;
  value: 0 | TDiceValues;
  diceRollNumber: number;
  // handleDoneDice: () => void;
  // handleSelectDice: () => void;
}

withDefaults(defineProps<ProfileDiceProps>(), {
  disabledDice: false,
  showDice: false,
  value: 0,
  diceRollNumber: 0,
});
</script>

<style scoped>
.game-profile-dice {
  animation: bounceIn 1s both;
  position: absolute;
  width: 60px;
  height: 60px;
  left: 62px;
  top: -5px;
  border-radius: 8px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #00487f;
  box-shadow:
    rgba(0, 0, 0, 0.4) 0px 2px 4px,
    rgba(0, 0, 0, 0.3) 0px 7px 13px -3px,
    rgba(0, 0, 0, 0.2) 0px -3px 0px inset;

  &::after {
    border-style: solid;
    border-width: 10px;
    content: '';
    height: 0;
    position: absolute;
    width: 0;
    border-color: #00487f transparent transparent transparent;
    transform: rotate(90deg);
    left: -30%;
    top: 35%;
  }

  &.hide {
    animation: bounceOut 0.6s both;
  }

  .game-profile-dice-button {
    -webkit-tap-highlight-color: rgba(255, 255, 255, 0);
    background: transparent;
    border: none;
    cursor: pointer;
    width: 45px;
    width: 45px;
  }
}

/* CSS Fix for firefox because it has an issue with animations. */
@-moz-document url-prefix() {
  @supports (animation: calc(0s)) {
    .game-profile-dice,
    .game-profile-dice.hide {
      animation: none;
    }

    .game-profile-dice {
      opacity: 1;
      transition: all 500ms ease;
    }

    .game-profile-dice.hide {
      opacity: 0;
    }
  }
}

.game-profile.right .game-profile-dice::after {
  transform: rotate(-90deg);
  left: auto;
  right: -30%;
}
</style>
