<template>
  <div>Token</div>
</template>

<script setup lang="ts">
import type { IDiceList, IToken } from '@/interfaces';
import { EColors, EtypeTile } from '@/utils/constants';

// TODO: Add handleSelectToken
interface TokenProps extends IToken {
  diceList?: IDiceList[]; // TODO: Remove optional value
  isDisabledUI?: boolean;
  debug?: boolean;
}

withDefaults(defineProps<TokenProps>(), {
  color: EColors.RED,
  coordinate: { x: 0, y: 0 },
  typeTile: EtypeTile.NORMAL,
  index: 0,
  diceAvailable: [],
  totalTokens: 4,
  position: 1,
  enableTooltip: false,
  isMoving: false,
  animated: false,
  canSelectToken: true,
  diceList: [],
  isDisabledUI: false,
  debug: true,
});
</script>
