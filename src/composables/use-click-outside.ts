// TODO: Add types
export const vClickOutside = {
  mounted(element: HTMLElement, binding: { value: Function }) {
    const handler = binding.value;
    (element as any).clickOutsideEventHandler = (event: MouseEvent) => {
      if (!element.contains(event.target as Node)) {
        handler();
      }
    };
    document.addEventListener('mousedown', (element as any).clickOutsideEventHandler);
  },
  beforeUnmount(element: HTMLElement) {
    document.removeEventListener('mousedown', (element as any).clickOutsideEventHandler);
  },
};
