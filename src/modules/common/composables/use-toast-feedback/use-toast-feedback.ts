import { ref, type Ref } from 'vue';

export default function useToastFeedback(): { messages: Ref<string[]> } {
  const messages = ref<string[]>(['Hello world', 'Good']);

  return { messages };
}
