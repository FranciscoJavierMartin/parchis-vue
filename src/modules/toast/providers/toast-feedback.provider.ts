import { defineComponent, provide, ref } from 'vue';
import { guid } from '@common/helpers/random.helper';
import {
  ToastAddToastSymbol,
  ToastRemoveToastSymbol,
  ToastMessagesSymbol,
} from '@toast/constants/toast.constants';
import type {
  TAddToastFunction,
  TRemoveToastFunction,
  TToastMessage,
  TToastMessages,
} from '@toast/interfaces/toast.interface';

export default defineComponent({
  name: 'ToastFeedbackProvider',
  setup() {
    const messages = ref<TToastMessage[]>([]);

    function addToast(message: string): void {
      const toast: TToastMessage = { message, id: guid() };
      messages.value = [...messages.value, toast];

      setTimeout(() => {
        removeToast(toast.id);
      }, 5000);
    }

    function removeToast(id: string): void {
      messages.value = messages.value.filter((toast) => toast.id !== id);
    }

    provide<TToastMessages>(ToastMessagesSymbol, messages);
    provide<TAddToastFunction>(ToastAddToastSymbol, addToast);
    provide<TRemoveToastFunction>(ToastRemoveToastSymbol, removeToast);
  },
  render() {
    return this.$slots.default();
  },
});
