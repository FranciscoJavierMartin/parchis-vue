import {
  OptionsGameStateSymbol,
  OptionsGameToogleOptionsSymbol,
  OptionsGamePlaySoundSymbol,
} from '@/constants/game';
import { INITIAL_OPTIONS_GAME } from '@/constants/online';
import { OPTIONS_GAME } from '@/constants/storage';
import { getValueFromCache, saveProperty } from '@/helpers/storage';
import type { IOptionsGame } from '@/interfaces/game';
import type { IEOptionsGame, IESounds } from '@/interfaces/online';
import { defineComponent, provide, reactive, readonly } from 'vue';

export default defineComponent({
  name: 'OptionsGameProvider',
  setup() {
    const optionsGame = reactive<IOptionsGame>(
      getValueFromCache(OPTIONS_GAME, INITIAL_OPTIONS_GAME),
    );

    function toogleOptions(type: IEOptionsGame): void {
      optionsGame[type] = !optionsGame[type];
      saveProperty(OPTIONS_GAME, optionsGame);
    }

    function playSound(type: IESounds): void {
      if (optionsGame.SOUND) {
        console.log('Play', type);
      }
    }

    provide(OptionsGameStateSymbol, readonly(optionsGame));
    provide(OptionsGameToogleOptionsSymbol, toogleOptions);
    provide(OptionsGamePlaySoundSymbol, playSound);
  },
  render() {
    return this.$slots.default();
  },
});
