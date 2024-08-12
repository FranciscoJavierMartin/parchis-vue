import { defineComponent, provide, ref } from 'vue';
import { ToastAddToastSymbol, ToastMessagesSymbol } from '@toast/constants/toast.constants';
import type { TAddToastFunction, TToastMessage } from '@toast/interfaces/toast.interface';

export default defineComponent({
  name: 'ToastFeedbackProvider',
  setup() {
    const messages = ref<string[]>([]);

    function addToast(message: string): void {
      messages.value = [...messages.value, message];
    }

    provide<TToastMessage>(ToastMessagesSymbol, messages);
    provide<TAddToastFunction>(ToastAddToastSymbol, addToast);
  },
  render() {
    return this.$slots.default();
  },
});
