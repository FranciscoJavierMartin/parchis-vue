import { defineComponent, onBeforeUnmount, onMounted, provide, reactive, watch } from 'vue';
import { getValueFromCache, saveProperty } from '@common/helpers/storage.helper';
import { Sprite } from '@sounds/helpers/sprite';
import { OPTIONS_GAME } from '@common/constants/storage.constants';
import type { TOptionsGame } from '@sounds/interfaces/sounds.interface';
import type { IESounds } from '@online/interfaces/online.interface';
import backgroundMusic from '@/assets/sounds/background.mp3';
import soundsSource from '@/assets/sounds/soundsSource.mp3';
import { INITIAL_OPTIONS_GAME } from '@online/constants/online.constants';
import { ESounds } from '@sounds/interfaces/sounds.enum';
import {
  OptionsGamePlaySoundSymbol,
  OptionsGameStateSymbol,
} from '@sounds/constants/sounds.constants';

export default defineComponent({
  name: 'OptionsGameProvider',
  setup() {
    const optionsGame = reactive<TOptionsGame>(
      getValueFromCache(OPTIONS_GAME, INITIAL_OPTIONS_GAME),
    );

    // Background music
    const audio = new Audio(backgroundMusic);
    audio.volume = 0.5;
    audio.loop = true;
    // TODO: Uncomment
    // audio.autoplay = optionsGame.MUSIC;

    // Sprite music
    const sounds = new Sprite<IESounds>(soundsSource, {
      CLICK: [0, 180],
      ROLL_DICE: [180, 1000],
      TOKEN_MOVE: [1100, 200],
      SAFE_ZONE: [1200, 360],
      TOKEN_JAIL: [1600, 450],
      GET_SIX: [2000, 600],
      CHAT: [2500, 500],
      USER_ONLINE: [2900, 690],
      USER_OFFLINE: [3500, 240],
      GAMER_OVER: [3900, 6000],
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

    function playSound(type: IESounds): void {
      if (optionsGame.SOUND) {
        sounds.play(type);
      }
    }

    provide(OptionsGameStateSymbol, optionsGame);
    provide(OptionsGamePlaySoundSymbol, playSound);

    watch(optionsGame, (newValue: TOptionsGame) => {
      if (newValue.MUSIC) {
        audio.play();
      } else {
        audio.pause();
      }

      saveProperty(OPTIONS_GAME, optionsGame);
    });

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
