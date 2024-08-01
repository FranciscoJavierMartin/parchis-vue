<template>
  <div v-if="indexProfile">
    <ProfilePlayer
      :base-position="basePosition"
      :position="position"
      :has-turn="hasTurn"
      :actions-turn="hasTurn ? actionsTurn : DEFAULT_VALUE_ACTION_TURN"
      :player="players[indexProfile - 1]"
      @handle-timer="(ends: boolean) => $emit('handleTimer', ends)"
      @handle-select-dice="
        (diceValue?: TDiceValues, isActionSocket?: boolean) =>
          $emit('handleSelectDice', diceValue, isActionSocket)
      "
      @handle-done-dice="(isActionSocket?: boolean) => $emit('handleDoneDice', isActionSocket)"
      @handle-mute-chat="(playerIndex: number) => $emit('handleMuteChat', playerIndex)"
    />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import ProfilePlayer from '@profiles/components/profile-player/profile-player.vue';
import { DEFAULT_VALUE_ACTION_TURN } from '@game/constants/game.constants';
import type {
  IProfilesData,
  TPositionProfile,
  TPositionProfiles,
} from '@profiles/interfaces/profile.interface';
import type { TTotalPlayers } from '@game/interfaces/game.interface';
import type { TDiceValues } from '@dice/interfaces/dice.interface';

interface ProfileSectionProps extends IProfilesData {
  position: TPositionProfile;
}

const props = defineProps<ProfileSectionProps>();
defineEmits<{
  handleTimer: [ends: boolean, playerIndex?: number];
  handleSelectDice: [diceValue?: TDiceValues, isActionSocket?: boolean];
  handleDoneDice: [isActionSocket?: boolean];
  handleMuteChat: [playerIndex: number];
}>();

type TPositionPlayerIndex = Record<TPositionProfile, number>;
type TPositionBoard = Record<TPositionProfiles, Partial<TPositionPlayerIndex>>;
type TPositionTotalPlayers = Record<TTotalPlayers, Partial<TPositionBoard>>;

const DISTRIBUTION_PROFILES: TPositionTotalPlayers = {
  2: {
    BOTTOM: {
      LEFT: 1,
    },
    TOP: {
      RIGHT: 2,
    },
  },
  3: {
    BOTTOM: {
      LEFT: 1,
    },
    TOP: {
      LEFT: 2,
      RIGHT: 3,
    },
  },
  4: {
    BOTTOM: {
      LEFT: 1,
      RIGHT: 4,
    },
    TOP: {
      LEFT: 2,
      RIGHT: 3,
    },
  },
};

const indexProfile =
  DISTRIBUTION_PROFILES[props.totalPlayers][props.basePosition]?.[props.position] || 0;

const hasTurn = computed<boolean>(
  () => indexProfile !== 0 && props.currentTurn === indexProfile - 1,
);
</script>
