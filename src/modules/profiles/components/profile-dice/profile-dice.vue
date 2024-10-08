<template>
  <div class="game-profile-dice" :class="{ hide: !showDice }">
    <BaseIcon type="arrow" />
    <button
      class="game-profile-dice-button"
      :disabled="disabledDice"
      @click="$emit('handleSelectDice')"
    >
      <Dice3d ref="diceRef" :size="45" :roll-time="ROLL_TIME_VALUE" @roll-done="rollDone" />
    </button>
  </div>
</template>

<script setup lang="ts">
import { ref, watch } from 'vue';
import Dice3d from '@dice/components/dice-3d/dice-3d.vue';
import { ROLL_TIME_VALUE } from '@game/constants/game.constants';
import type { TDiceValues } from '@dice/interfaces/dice.interface';
import BaseIcon from '@common/components/icons/base-icon.vue';

interface ProfileDiceProps {
  /** Is roll dice disabled */
  disabledDice: boolean;
  /** Show dice */
  showDice: boolean;
  /** Current dice value */
  value: 0 | TDiceValues;
  /** Number of rollings */
  diceRollNumber: number;
}

const props = withDefaults(defineProps<ProfileDiceProps>(), {
  disabledDice: false,
  showDice: false,
  value: 0,
  diceRollNumber: 0,
});
const emit = defineEmits<{
  /** When roll dice is done */
  handleDoneDice: [isActionSocket?: boolean];
  /** When press dice */
  handleSelectDice: [diceValue?: TDiceValues, isActionSocket?: boolean];
}>();

//#region REFS
const diceRef = ref<typeof Dice3d | null>(null);
//#endregion

//#region FUNCTIONS
function rollDone(): void {
  if (props.value) {
    emit('handleDoneDice');
  }
}
//#endregion

//#region WATCHERS
watch(
  () => [props.value, props.diceRollNumber],
  () => {
    if (props.value !== 0 && props.diceRollNumber !== 0) {
      diceRef.value?.rollDice(props.value);
    }
  },
);
//#endregion
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
    left: 17px;
    z-index: 1;
    width: 25px;
    height: 25px;
    color: white;
    filter: drop-shadow(0px -2px 1px black);
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

.game-profile.right .game-profile-dice {
  left: 54px;

  &::after {
    right: -30%;
    left: auto;
    transform: rotate(-90deg);
  }
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
