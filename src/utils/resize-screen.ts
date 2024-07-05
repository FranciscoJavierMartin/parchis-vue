import { BASE_HEIGHT, BASE_WIDTH } from '@/utils/constants';
import { $, debounce, isMobile } from '@/utils/helpers';

export default debounce(() => {
  const bodyElement = $('#app') as HTMLBodyElement;
  let scale = Math.min(window.innerWidth / BASE_WIDTH, window.innerHeight / BASE_HEIGHT);
  const mobile = isMobile();

  if (scale >= 1 || mobile) {
    scale = mobile ? scale : 1;
  }

  const applyZoom =
    window.innerWidth < BASE_WIDTH ? Math.round((100 * window.innerWidth) / BASE_WIDTH) : 100;

  bodyElement.setAttribute('style', `zoom: ${applyZoom}%; transform: scale(${scale})`);
}, 100);
