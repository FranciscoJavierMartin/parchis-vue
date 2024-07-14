<template>
  <div v-if="indexProfile">
    <ProfilePlayer
      v-bind="profileHandlers"
      :base-position="basePosition"
      :position="position"
      :has-turn="hasTurn"
      :actions-turn="hasTurn ? actionsTurn : DEFAULT_VALUE_ACTION_TURN"
      :player="players[indexProfile - 1]"
    />
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import ProfilePlayer from '@/components/game/profiles/profile/profile-player.vue';
import { DEFAULT_VALUE_ACTION_TURN } from '@/constants/game';
import type { IProfileHandlers, TPositionProfile, TPositionProfiles } from '@/interfaces/profile';
import type { IPlayer } from '@/interfaces/user';
import type { IActionsTurn, TTotalPlayers } from '@/interfaces/game';

// TODO: Extract in common (without position)
interface ProfileSectionProps {
  basePosition: TPositionProfiles;
  currentTurn: number;
  players: IPlayer[];
  totalPlayers: TTotalPlayers;
  profileHandlers: IProfileHandlers;
  actionsTurn: IActionsTurn;
  position: TPositionProfile;
}

const props = defineProps<ProfileSectionProps>();

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
