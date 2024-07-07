function handleClick(element: HTMLElement, event: Event, handler: Function) {
  if (!element.contains(event.target as Node)) {
    handler();
  }
}

export const vClickOutside = {
  mounted(element: HTMLElement, binding, vnode) {
    console.log('Mounted', binding.value);
    const handler = binding.value;

    document.addEventListener('mousedown', (event) => {
      handleClick(element, event, handler);
    });
  },
  beforeUnmount(element, binding, vnode) {
    console.log('Unmounted', binding);
    document.onmousedown = null;
  },
};
