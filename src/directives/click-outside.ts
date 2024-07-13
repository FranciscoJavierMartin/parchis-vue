import type { Directive } from 'vue';

export const vClickOutside: Directive<HTMLElement, Function> = {
  mounted(element: HTMLElement, binding: { value: Function }) {
    const handler = binding.value;
    (element as any).clickOutsideEventHandler = (event: MouseEvent) => {
      if (!element.contains(event.target as Node)) {
        handler();
      }
    };
    document.addEventListener('mousedown', (element as any).clickOutsideEventHandler);
    document.addEventListener('touchstart', (element as any).clickOutsideEventHandler);
  },
  beforeUnmount(element: HTMLElement) {
    document.removeEventListener('mousedown', (element as any).clickOutsideEventHandler);
    document.removeEventListener('touchstart', (element as any).clickOutsideEventHandler);
  },
};
