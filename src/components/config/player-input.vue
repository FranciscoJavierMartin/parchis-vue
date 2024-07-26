<template>
  <div class="game-offline-player">
    <SelectTokenColor :disabled="disabled" v-model="tokenColor" />
    <InputName :disabled="disabled" v-model="playerName" />
    <BotSwitch :id="`${id}_bot_switch`" v-model="isBot" />
  </div>
</template>

<script setup lang="ts">
import type { TColors } from '@/interfaces/board';
import type { IPlayerOffline } from '@/interfaces/player';
import SelectTokenColor from '@/components/config/select-token-color.vue';
import InputName from '@/components/config/input-name.vue';
import BotSwitch from '@/components/config/bot-switch.vue';

interface PlayerInputProps extends IPlayerOffline {}

withDefaults(defineProps<PlayerInputProps>(), { name: '', disabled: false });

const tokenColor = defineModel<TColors>('color', { required: true });
const playerName = defineModel<string>('name', { required: true });
const isBot = defineModel<boolean>('isBot');
</script>

<style scoped>
.game-offline-player {
  display: flex;
  align-items: center;
  justify-content: space-around;
  width: 90%;
  margin-bottom: 15px;
}
</style>
