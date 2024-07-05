import onWindowResise from '@/utils/resize-screen';
import { onMounted, onUnmounted } from 'vue';

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
