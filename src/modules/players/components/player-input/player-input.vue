<template>
  <div class="game-offline-player">
    <SelectTokenColor :disabled="disabled" v-model="tokenColor" />
    <InputName :disabled="disabled" v-model="playerName" />
    <BotSwitch :id="`${id}_bot_switch`" v-model="isBot" />
  </div>
</template>

<script setup lang="ts">
import type { TColors } from '@board/interfaces/board';
import type { IPlayerOffline } from '@players/interfaces/player';
import SelectTokenColor from '@players/components/select-token-color/select-token-color.vue';
import InputName from '@players/components/input-name/input-name.vue';
import BotSwitch from '@players/components/bot-switch/bot-switch.vue';

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
