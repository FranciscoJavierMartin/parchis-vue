import { onMounted, onUnmounted } from 'vue';
import onWindowResise from '@common/helpers/resize-screen';

export default function useWindowResize(): void {
  onMounted(() => {
    window.onresize = onWindowResise;
    onWindowResise();

    document.addEventListener(
      'contextmenu',
      (e) => {
        e.preventDefault();
      },
      false,
    );
  });

  onUnmounted(() => {
    window.onresize = null;
    document.oncontextmenu = null;
  });
}
