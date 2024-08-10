<template>
  <div
    class="token-tooltip"
    :class="[color.toLowerCase(), tooltipPosition.position]"
    :style="{ left: `${tooltipPosition.coordinate.x}px`, top: `${tooltipPosition.coordinate.y}px` }"
  >
    <button
      v-for="dice in diceAvailable"
      :key="dice.key"
      :title="`Dice ${dice.value}`"
      @click="$emit('handleTooltipDice', dice)"
    >
      <DiceFace :value="dice.value" :size="DICE_SIZE_TOOLTIP" shadow />
    </button>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import DiceFace from '@dice/components/dice-face/dice-face.vue';
import { DICE_SIZE_TOOLTIP, SIZE_BOARD, SIZE_TILE } from '@board/constants/sizes.constants';
import type { ICoordinate, TColors } from '@board/interfaces/board.interface';
import type { IDiceList } from '@dice/interfaces/dice.interface';
import { EColors } from '@board/interfaces/board.enum';

interface TokenTooltipProps {
  /** Token color */
  color: TColors;
  /** Token coordinate */
  coordinate: ICoordinate;
  /** Dice available */
  diceAvailable?: IDiceList[];
}

const props = withDefaults(defineProps<TokenTooltipProps>(), {
  color: EColors.RED,
  coordinate: { x: 0, y: 0 } as unknown as () => ICoordinate,
  diceAvailable: [] as unknown as () => IDiceList[],
});
defineEmits<{
  /** Select dice in tooltip */
  handleTooltipDice: [dice: IDiceList];
}>();

function isCoordinateInRange(coordinate: ICoordinate): boolean {
  return (
    coordinate.x >= 0 &&
    coordinate.x <= SIZE_BOARD &&
    coordinate.y >= 0 &&
    coordinate.y <= SIZE_BOARD
  );
}

const tooltipPosition = computed(() => {
  const tooltipSize = {
    width: Math.round(props.diceAvailable.length * DICE_SIZE_TOOLTIP),
    height: DICE_SIZE_TOOLTIP,
  };

  const posiblePositions = {
    center: {
      x: -(tooltipSize.width / 2),
      y: -(tooltipSize.height + SIZE_TILE),
    },
    left: {
      x: 0,
      y: -(tooltipSize.height + SIZE_TILE),
    },
    top: {
      x: -(tooltipSize.width / 2),
      y: tooltipSize.height + 5,
    },
    right: {
      x: -(tooltipSize.width - 8),
      y: -(tooltipSize.height + SIZE_TILE),
    },
  };

  const position = Object.entries(posiblePositions).find((position) => {
    const tooltipTopLeft = {
      x: props.coordinate.x + position[1].x,
      y: props.coordinate.y + position[1].y,
    };

    const tooltipBottomRight = {
      x: tooltipTopLeft.x + tooltipSize.width + 16,
      y: tooltipTopLeft.y + tooltipSize.height + 8,
    };

    return isCoordinateInRange(tooltipTopLeft) && isCoordinateInRange(tooltipBottomRight);
  });

  const finalPosition: { position: string; coordinate: ICoordinate } = position
    ? {
        position: position[0],
        coordinate: {
          x: props.coordinate.x + position[1].x,
          y: props.coordinate.y + position[1].y,
        },
      }
    : {
        position: '',
        coordinate: { x: 0, y: 0 },
      };

  return finalPosition;
});
</script>

<style scoped>
.token-tooltip {
  position: absolute;
  z-index: 10;
  display: flex;
  gap: 5px;
  padding: 8px;
  border-radius: 5px;
  box-shadow: -2px 4px 14px 0px #090909;
  animation: bounceIn 0.5s both;

  &::after {
    position: absolute;
    top: 100%;
    left: 40%;
    width: 0;
    height: 0;
    content: '';
    border-style: solid;
    border-width: 10px;
  }

  &.left {
    border-radius: 5px 5px 5px 3px;

    &::after {
      left: 2%;
    }
  }

  &.top::after {
    top: -40%;
    transform: scale(-1);
  }

  &.right::after {
    left: 73%;
  }

  &.blue {
    background-color: var(--game-blue);

    &::after {
      border-color: var(--game-blue) transparent transparent transparent;
    }
  }

  &.red {
    background-color: var(--game-red);

    &::after {
      border-color: var(--game-red) transparent transparent transparent;
    }
  }

  &.yellow {
    background-color: var(--game-yellow);

    &::after {
      border-color: var(--game-yellow) transparent transparent transparent;
    }
  }

  &.green {
    background-color: var(--game-green);

    &::after {
      border-color: var(--game-green) transparent transparent transparent;
    }
  }

  button {
    padding: 0;
    margin: 0;
    cursor: pointer;
    background-color: transparent;
    border: 0;
  }
}
</style>
