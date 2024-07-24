<template>
  <div class="game-offline-player">
    {{ color }}
    {{ name }}
    {{ isBot ? 'Yes' : 'No' }}
  </div>
</template>

<script setup lang="ts">
import type { TColors } from '@/interfaces/board';
import type { IPlayerOffline } from '@/interfaces/player';

interface PlayerInputProps extends IPlayerOffline {}

withDefaults(defineProps<PlayerInputProps>(), { name: '', disabled: false });

defineEmits<{
  isBot: [nextChecked: boolean];
  updateName: [name: string];
  changeColor: [color: TColors];
}>();
</script>

<style scoped>
.game-offline-player {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 90%;
  margin-bottom: 15px;
}
</style>
