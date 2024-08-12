import { defineComponent, provide, ref } from 'vue';
import { guid } from '@common/helpers/random.helper';
import { ToastAddToastSymbol, ToastMessagesSymbol } from '@toast/constants/toast.constants';
import type {
  TAddToastFunction,
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

    provide<TToastMessages>(ToastMessagesSymbol, messages);
    provide<TAddToastFunction>(ToastAddToastSymbol, addToast);
  },
  render() {
    return this.$slots.default();
  },
});
