<template>
  <div>Game Over</div>
</template>

<script setup lang="ts">
import type { IPlayer } from '@/interfaces/user';

interface GameOverProps {
  players: IPlayer[];
}

defineProps<GameOverProps>();
</script>
