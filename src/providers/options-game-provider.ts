import { defineComponent, onBeforeUnmount, onMounted, provide, reactive, watch } from 'vue';
import { OptionsGameStateSymbol, OptionsGamePlaySoundSymbol } from '@/constants/game';
import { ESounds, INITIAL_OPTIONS_GAME } from '@/constants/online';
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

    function onClickEvent(e: MouseEvent): void {
      const target = e.target as Element;
      const elements: string[] = ['a', 'button', 'input', 'svg', 'path', 'line'];

      if (
        elements.includes(target.tagName.toLowerCase()) ||
        elements.includes(target.parentElement?.tagName.toLowerCase() || '')
      ) {
        playSound(ESounds.CLICK);
      }
    }

    onMounted(() => {
      window.addEventListener('click', onClickEvent);
    });

    onBeforeUnmount(() => {
      window.removeEventListener('click', onClickEvent);
    });
  },
  render() {
    return this.$slots.default();
  },
});
