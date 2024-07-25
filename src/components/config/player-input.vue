<template>
  <div class="game-offline-player">
    <SelectTokenColor :disabled="disabled" v-model="color1" />
    <InputName :disabled="disabled" />
    <BotSwitch :id="`${id}_bot_switch`" />
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

defineEmits<{
  isBot: [nextChecked: boolean];
  updateName: [name: string];
  changeColor: [color: TColors];
}>();

const color1 = defineModel<TColors>({ required: true });
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
