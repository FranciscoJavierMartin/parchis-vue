import { defineComponent, provide, reactive, watch } from 'vue';
import { OptionsGameStateSymbol, OptionsGamePlaySoundSymbol } from '@/constants/game';
import { INITIAL_OPTIONS_GAME } from '@/constants/online';
import { OPTIONS_GAME } from '@/constants/storage';
import { getValueFromCache, saveProperty } from '@/helpers/storage';
import type { IOptionsGame } from '@/interfaces/game';
import type { IESounds } from '@/interfaces/online';

export default defineComponent({
  name: 'OptionsGameProvider',
  setup() {
    const optionsGame = reactive<IOptionsGame>(
      getValueFromCache(OPTIONS_GAME, INITIAL_OPTIONS_GAME),
    );

    function playSound(type: IESounds): void {
      if (optionsGame.SOUND) {
        console.log('Play', type);
      }
    }

    provide(OptionsGameStateSymbol, optionsGame);
    provide(OptionsGamePlaySoundSymbol, playSound);

    watch(optionsGame, () => {
      saveProperty(OPTIONS_GAME, optionsGame);
    });
  },
  render() {
    return this.$slots.default();
  },
});
