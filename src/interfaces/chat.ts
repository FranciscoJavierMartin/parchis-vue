import type { TYPES_CHAT_MESSAGES } from '@/constants/chat';

export type ITypeChatMessage = keyof typeof TYPES_CHAT_MESSAGES;
export type IPredefinedChatMessages = Record<ITypeChatMessage, { index: number; value: string }[]>;

export interface ISocketListenChatMessage {
  userID: string;
  type: ITypeChatMessage;
  messageIndex: number;
}
