<template>
  <div
    class="game-token"
    :class="{ moving: isMoving, animated }"
    :style="{
      height: 'var(--size-tile)',
      left: `${coordinate.x}px`,
      top: `${coordinate.y}px`,
      width: 'var(--size-tile)',
      zIndex,
    }"
  >
    <TokenPiece :color="color" :debug="debug" :index="index" :style="pieceStyle" />
    <button v-if="showButton" class="game-token-button" @click="handleClickDice" />
  </div>
  <TokenTooltip
    v-if="diceAvailable.length > 1 && canSelectToken && showTooltip"
    :color="color"
    :coordinate="coordinate"
    :diceAvailable="diceAvailable"
    @handle-tooltip-dice="handleTooltipDice"
    v-click-outside="handleClickOutside"
  />
</template>

<script setup lang="ts">
import { computed, ref, watchEffect, type StyleValue } from 'vue';
import TokenPiece from '@tokens/components/token/components/token-piece/token-piece.vue';
import TokenTooltip from '@tokens/components/token/components/token-tooltip/token-tooltip.vue';
import { vClickOutside } from '@common/directives/click-outside/click-outside.directive';
import { MAXIMUM_VISIBLE_TOKENS_PER_CELL } from '@board/constants/board.constants';
import { BASE_ZINDEX_TOKEN, ZINDEX_TOKEN_SELECT } from '@board/constants/sizes.constants';
import type { ISelectTokenValues, IToken } from '@tokens/interfaces/token.interface';
import type { IDiceList } from '@dice/interfaces/dice.interface';
import { EColors, EtypeTile } from '@board/interfaces/board.enum';

interface TokenProps extends IToken {
  /** Dice list */
  diceList: IDiceList[];
  /** Disable UI interaction */
  isDisabledUI?: boolean;
  /** Enable debug */
  debug?: boolean;
}

const props = withDefaults(defineProps<TokenProps>(), {
  color: EColors.RED,
  typeTile: EtypeTile.NORMAL,
  index: 0,
  diceAvailable: [] as unknown as () => IDiceList[],
  totalTokens: 4,
  position: 1,
  enableTooltip: false,
  isMoving: false,
  animated: false,
  canSelectToken: true,
  isDisabledUI: false,
  debug: false,
});
const emit = defineEmits<{
  /** Emitted when select dice */
  handleSelectedToken: [selectedTokenValues: ISelectTokenValues];
}>();

const showTooltip = ref<boolean>(props.enableTooltip);

function handleClickOutside(): void {
  showTooltip.value = false;
}

function handleClickDice(): void {
  if (props.diceAvailable.length === 1) {
    const diceIndex = props.diceList.findIndex((dice) => dice.key === props.diceAvailable[0].key);
    emit('handleSelectedToken', { diceIndex, tokenIndex: props.index });
  } else {
    showTooltip.value = true;
  }
}

function handleTooltipDice(dice: IDiceList): void {
  showTooltip.value = false;
  const diceIndex = props.diceList.findIndex((d) => d.key === dice.key);
  emit('handleSelectedToken', { diceIndex, tokenIndex: props.index });
}

const zIndex = computed<number>(() => {
  /*
   * If it has available dices, sets the z-index of selection, in this way the token will remain on top of the others that are in the same cell (if there are any...).
   * It will also be set if the piece is moving, in this case, it will take the higher z-index to stay on top...
   * Sets the value canSelectToken with totalDiceAvailable,
   * since it should only take into account the value of totalDiceAvailable,
   * if the user can select the token, also enters when
   * the token is being moved.
   */
  return (props.canSelectToken && props.diceAvailable.length) || props.isMoving
    ? ZINDEX_TOKEN_SELECT
    : /**
       * On the contrary, if there are more tokens in the same cell,
       * sets its z-index depending on the position, so
       * it will be one on top of the other.
       * Only the first 4 are taken into account, if there are more, their z-index is not set
       * and it will remain with the default value.
       */
      props.totalTokens > 1 && props.position <= MAXIMUM_VISIBLE_TOKENS_PER_CELL
      ? props.position
      : // By default, zIndex is the same that token container.
        BASE_ZINDEX_TOKEN;
});

const pieceStyle = computed<StyleValue>(() => {
  /**
   * The different scales depending on the number of pieces that exist in the same cell.
   */
  const scales = [0.85, 0.7, 0.6, 0.5];

  /**
   * The position of the token in the cell depending on the number of tokens that exist.
   */
  const positions = [[0], [-4, 4], [-8, 0, 8], [-12, -5, 5, 12]];

  /**
   * If the total number of tokens (starts from 1) is less than or equal to the total number of positions,
   * then the index is created, but if the value of totalTokens is greater, it is indicated by default that
   * the value of the position to take is the last one, since they will be displayed as if it were 4 tokens
   * if there are more than 4, those tokens will not be shown, but for the rest, the position for 4 tokens applies.
   */
  const indexPosition = props.totalTokens <= positions.length ? props.totalTokens - 1 : 3;

  /**
   * If the position of the token is less than or equal to 4, then the scale is set,
   * if not, the scale will be 0, hiding the token.
   * For example, if there are 6 tokens in the same cell, only 4 tokens will be shown,
   * the 5th and 6th will have a scale of 0.
   * If token is at end, a smaller scale is set.
   */
  // TODO: Refactor to make a single expression
  let scale: number = props.position <= MAXIMUM_VISIBLE_TOKENS_PER_CELL ? scales[indexPosition] : 0;

  if ((props.canSelectToken && props.diceAvailable.length) || props.isMoving) {
    scale = scales[0];
  }

  if (props.typeTile === EtypeTile.END) {
    scale = 0.45;
  }

  /**
   * Determine position in cell.
   */
  const translateX =
    (props.canSelectToken && props.diceAvailable.length) || props.isMoving
      ? positions[0][0]
      : props.position <= MAXIMUM_VISIBLE_TOKENS_PER_CELL
        ? positions[indexPosition][props.position - 1]
        : 0;

  return {
    width: 'var(--size-tile)',
    height: 'var(--size-tile)',
    transform: `scale(${scale}) translate(${translateX}px, -1px)`,
  };
});

const showButton = computed<boolean>(
  () =>
    props.canSelectToken &&
    props.diceAvailable.length !== 0 &&
    !showTooltip.value &&
    !props.isMoving &&
    !props.isDisabledUI,
);

// If there are not available dices, then dismiss tooltip
watchEffect(() => {
  if (showTooltip.value && props.diceAvailable.length === 0) {
    showTooltip.value = false;
  }
});
</script>

<style scoped>
.game-token {
  position: absolute;

  &.animated {
    transition: all 100ms ease;
  }

  &.moving {
    animation: heartBeat 1s infinite;
  }

  .game-token-button {
    position: absolute;
    top: -10%;
    left: -10%;
    z-index: 1;
    width: 120%;
    height: 120%;
    cursor: pointer;
    background-color: rgba(0, 0, 0, 0.1);
    -webkit-backdrop-filter: blur(1.4px);
    backdrop-filter: blur(5px);
    border: 2px dashed rgba(255, 255, 255, 1);
    border-radius: 50%;
    animation: rotation 5s normal linear infinite;
    -webkit-tap-highlight-color: rgba(255, 255, 255, 0);
  }
}

@keyframes rotation {
  from {
    transform: rotate(0deg);
  }
  to {
    transform: rotate(359deg);
  }
}

@keyframes heartBeat {
  0% {
    transform: scale(1);
  }

  14% {
    transform: scale(1.3);
  }

  28% {
    transform: scale(1);
  }

  42% {
    transform: scale(1.3);
  }

  70% {
    transform: scale(1);
  }
}
</style>
