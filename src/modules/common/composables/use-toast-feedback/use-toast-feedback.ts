import { ref, type Ref } from 'vue';

export default function useToastFeedback(): { messages: Ref<string[]> } {
  const messages = ref<string[]>([]);

  return { messages };
}
