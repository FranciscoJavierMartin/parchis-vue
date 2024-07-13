<template>
  <div class="game-profile-dice" :class="{ hide: !showDice }">
    <GameIcon type="arrow" />
    <button class="game-profile-dice-button" :disabled="disabledDice" @click="rollDice">
      <Dice3d ref="diceRef" :size="45" />
    </button>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue';
import type { TDiceValues } from '@/interfaces';
import Dice3d from '@/components/game/components/dice/dice-3d.vue';
import GameIcon from '@/components/icons/game-icon.vue';
import { ROLL_TIME_VALUE } from '@/constants/game';

interface ProfileDiceProps {
  disabledDice: boolean;
  showDice: boolean;
  value: 0 | TDiceValues;
  diceRollNumber: number;
  handleDoneDice: () => void;
  handleSelectDice: () => void;
}

const props = withDefaults(defineProps<ProfileDiceProps>(), {
  disabledDice: false,
  showDice: false,
  value: 0,
  diceRollNumber: 0,
});

const diceRef = ref<typeof Dice3d | null>(null);
// TODO: Adjust roll time in dice to this values (accept as a prop)
const rollTime = props.value !== 0 ? ROLL_TIME_VALUE : 0;

function rollDice(): void {
  diceRef.value?.rollDice();
}
</script>

<style scoped>
.game-profile-dice {
  position: absolute;
  top: -5px;
  left: 62px;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 60px;
  height: 60px;
  background-color: #00487f;
  border-radius: 8px;
  box-shadow:
    rgba(0, 0, 0, 0.4) 0px 2px 4px,
    rgba(0, 0, 0, 0.3) 0px 7px 13px -3px,
    rgba(0, 0, 0, 0.2) 0px -3px 0px inset;
  animation: bounceIn 1s both;

  &::after {
    position: absolute;
    top: 35%;
    left: -30%;
    width: 0;
    height: 0;
    content: '';
    border-color: #00487f transparent transparent transparent;
    border-style: solid;
    border-width: 10px;
    transform: rotate(90deg);
  }

  &.hide {
    animation: bounceOut 0.6s both;
  }

  .icon-wrapper {
    position: absolute;
    top: -25px;
    left: 25px;
    z-index: 1;
    width: 50px;
    height: 50px;
    filter: drop-shadow(0px -2px 1px black);
    scale: 1.5;
    animation: move-arrow 0.5s infinite alternate;
  }

  .game-profile-dice-button {
    position: absolute;
    z-index: 10;
    width: 45px;
    cursor: pointer;
    background: transparent;
    border: none;
    -webkit-tap-highlight-color: rgba(255, 255, 255, 0);
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
  right: -30%;
  left: auto;
  transform: rotate(-90deg);
}

@keyframes move-arrow {
  from {
    transform: translateY(0);
  }
  to {
    transform: translateY(-10px);
  }
}
</style>
