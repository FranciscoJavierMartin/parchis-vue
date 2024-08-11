import { ref, type Ref } from 'vue';

export type TToastMessage = {
  message: string;
  id: number;
};

export default function useToastFeedback(): {
  messages: Ref<TToastMessage[]>;
  addToast: (text: string) => void;
} {
  const messages = ref<TToastMessage[]>([
    { message: 'Hello world', id: Math.random() },
    { message: 'Good', id: Math.random() },
    {
      message:
        'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Voluptatem voluptatibus earum itaque neque. Magnam dicta doloremque aut beatae, unde exercitationem esse enim explicabo. Obcaecati voluptate eligendi debitis quos amet impedit!',
      id: Math.random(),
    },
  ]);

  function addToast(text: string): void {
    const newToast = { message: text, id: Math.random() };
    messages.value.push(newToast);

    setTimeout(() => {
      messages.value = messages.value.filter((toast) => toast.id !== newToast.id);
    }, 1100);
  }

  return { messages, addToast };
}
