import type { Ref } from 'vue';

export type TToastMessage = Ref<string[]>;
export type TAddToastFunction = (message: string) => void;
