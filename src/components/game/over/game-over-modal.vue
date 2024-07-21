<template>
  <div>Game Over</div>
</template>

<script setup lang="ts">
import { getOrganizedRanking } from '@/helpers/player';
import type { IPlayer } from '@/interfaces/user';
import { onBeforeMount, ref } from 'vue';

interface GameOverProps {
  players: IPlayer[];
}

const props = defineProps<GameOverProps>();
const first = ref<IPlayer>();
const others = ref<IPlayer[]>();

onBeforeMount(() => {
  const rankingPlayers = getOrganizedRanking(props.players);
  first.value = rankingPlayers.first;
  others.value = rankingPlayers.others;
});
</script>
