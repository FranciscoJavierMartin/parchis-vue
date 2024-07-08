<template>
  <div v-if="indexProfile">{{ position }} - {{ indexProfile }}</div>
</template>

<script setup lang="ts">
import type {
  IPlayer,
  IProfileHandlers,
  TPositionProfile,
  TPositionProfiles,
  TTotalPlayers,
} from '@/interfaces';

// TODO: Extract in common (without position)
interface ProfileSectionProps {
  basePosition: TPositionProfiles;
  currentTurn: number;
  players: IPlayer[];
  totalPlayers: TTotalPlayers;
  profileHandlers: IProfileHandlers;
  // actionsTurn: IActionsTurn;
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
  DISTRIBUTION_PROFILES[props.totalPlayers]?.[props.basePosition]?.[props.position] || 0;
</script>
RiMiLe21_nuUf