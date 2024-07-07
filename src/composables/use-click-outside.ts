export const vClickOutside = {
  mounted(el, binding, vnode) {
    console.log('Mounted');
  },
  beforeUnmount(el, binding, vnode) {
    console.log('Unmounted');
  },
};
