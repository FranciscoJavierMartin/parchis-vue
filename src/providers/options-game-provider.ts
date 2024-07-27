import { defineComponent, provide, reactive, watch } from 'vue';
import { OptionsGameStateSymbol, OptionsGamePlaySoundSymbol } from '@/constants/game';
import { INITIAL_OPTIONS_GAME } from '@/constants/online';
import { OPTIONS_GAME } from '@/constants/storage';
import { getValueFromCache, saveProperty } from '@/helpers/storage';
import type { IOptionsGame } from '@/interfaces/game';
import type { IESounds } from '@/interfaces/online';
import backgroundMusic from '@/assets/sounds/background.mp3';

export default defineComponent({
  name: 'OptionsGameProvider',
  setup() {
    const optionsGame = reactive<IOptionsGame>(
      getValueFromCache(OPTIONS_GAME, INITIAL_OPTIONS_GAME),
    );

    const audio = new Audio(backgroundMusic);
    audio.volume = 0.5;
    audio.loop = true;
    // audio.autoplay = optionsGame.MUSIC;

    function playSound(type: IESounds): void {
      if (optionsGame.SOUND) {
        console.log('Play', type);
      }
    }

    provide(OptionsGameStateSymbol, optionsGame);
    provide(OptionsGamePlaySoundSymbol, playSound);

    watch(optionsGame, (newValue: IOptionsGame) => {
      if (newValue.MUSIC) {
        audio.play();
      } else {
        audio.pause();
      }

      saveProperty(OPTIONS_GAME, optionsGame);
    });
  },
  render() {
    return this.$slots.default();
  },
});
