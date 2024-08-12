import type { Ref } from 'vue';

export type TToastMessage = {
  message: string;
  id: string;
};
export type TToastMessages = Ref<TToastMessage[]>;
export type TAddToastFunction = (message: string) => void;
