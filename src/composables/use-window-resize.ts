import { onMounted, onUnmounted } from 'vue';
import onWindowResise from '@/helpers/resize-screen';

export default function useWindowResize() {
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
  });
}
