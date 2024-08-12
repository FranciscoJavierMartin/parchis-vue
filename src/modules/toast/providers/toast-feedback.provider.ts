import { defineComponent, provide, ref } from 'vue';
import { guid } from '@common/helpers/random.helper';
import {
  ToastAddToastSymbol,
  ToastDismissToastSymbol,
  ToastMessagesSymbol,
} from '@toast/constants/toast.constants';
import type {
  TAddToastFunction,
  TDismissToastFunction,
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
    }

    function dismissToast(id: string): void {
      messages.value = messages.value.filter((toast) => toast.id !== id);
    }

    provide<TToastMessages>(ToastMessagesSymbol, messages);
    provide<TAddToastFunction>(ToastAddToastSymbol, addToast);
    provide<TDismissToastFunction>(ToastDismissToastSymbol, dismissToast);
  },
  render() {
    return this.$slots.default();
  },
});
