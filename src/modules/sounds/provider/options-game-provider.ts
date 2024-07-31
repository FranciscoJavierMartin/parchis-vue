import { defineComponent, onBeforeUnmount, onMounted, provide, reactive, watch } from 'vue';
import { ESounds, INITIAL_OPTIONS_GAME } from '@/modules/online/constants/online';
import { getValueFromCache, saveProperty } from '@/modules/common/helpers/storage';
import { Sprite } from '@/modules/sounds/helpers/sounds';
import { OptionsGameStateSymbol, OptionsGamePlaySoundSymbol } from '@/modules/game/constants/game';
import { OPTIONS_GAME } from '@/modules/common/constants/storage';
import type { TOptionsGame } from '@/modules/sounds/interfaces/sounds';
import type { IESounds } from '@/modules/online/interfaces/online';
import backgroundMusic from '@/assets/sounds/background.mp3';
import soundsSource from '@/assets/sounds/soundsSource.mp3';

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
