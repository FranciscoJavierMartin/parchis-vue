<template>
  <div class="game-offline-player">
    <SelectTokenColor :disabled="disabled" v-model="tokenColor" />
    <InputName :disabled="disabled" v-model="playerName" />
    <InputSwitch :id="`${id}_bot_switch`" :icon="botImage" v-model="isBot" :disabled="disabled" />
  </div>
</template>

<script setup lang="ts">
import type { TColors } from '@board/interfaces/board.interface';
import type { IPlayerOffline } from '@players/interfaces/player.interface';
import SelectTokenColor from '@players/components/select-token-color/select-token-color.vue';
import InputName from '@players/components/input-name/input-name.vue';
import InputSwitch from '@common/components/input-switch/input-switch.vue';
import botImage from '@/assets/images/bot.png';

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
