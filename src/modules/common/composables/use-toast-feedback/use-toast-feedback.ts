import { ref, type Ref } from 'vue';

export default function useToastFeedback(): {
  messages: Ref<string[]>;
  addToast: (text: string) => void;
} {
  const messages = ref<string[]>([
    'Hello world',
    'Good',
    'Lorem ipsum dolor sit amet consectetur, adipisicing elit. Voluptatem voluptatibus earum itaque neque. Magnam dicta doloremque aut beatae, unde exercitationem esse enim explicabo. Obcaecati voluptate eligendi debitis quos amet impedit!',
  ]);

  function addToast(text: string): void {
    messages.value.push(text);
  }

  return { messages, addToast };
}
