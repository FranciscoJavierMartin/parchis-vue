export const vClickOutside = {
  mounted(el, binding, vnode) {
    console.log('Mounted', binding.value);

    // document.addEventListener('mousedown', )
  },
  beforeUnmount(el, binding, vnode) {
    console.log('Unmounted');
  },
};
