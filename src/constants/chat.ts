import type { IPredefinedChatMessages, ISocketError } from '@/interfaces';

/**
 * Errors in sockets
 */
export const SOCKET_ERROR_MESSAGES: ISocketError = {
  INVALID_ROOM: 'The room is not valid',
  INVALID_COLOR: 'Invalid token color',
  INVALID_USER: 'Invalid user',
  UNAUTHENTICATED: 'User is not authenticated',
  AUTHENTICATED: 'User already authenticated',
};

/**
 * Types messages in chat
 */
export enum TYPES_CHAT_MESSAGES {
  EMOJI = 'EMOJI',
  TEXT = 'TEXT',
}

/**
 * Chat predefined messages
 */
export const PREDEFINED_CHAT_MESSAGES: IPredefinedChatMessages = {
  [TYPES_CHAT_MESSAGES.TEXT]: [
    'Hi',
    'Nice move!',
    'Oh no!',
    'Good game!',
    'Best of luck!',
    'Oops...',
    'Thanks!',
    'Bye bye',
    'Play fast',
    'Sorry!',
    'Catch me if you can!',
    'Please do not kill me',
    'Unlucky',
    'Not again!',
    "You're lucky!",
    'I will eat you',
  ].map((value, index) => ({ index, value })),
  [TYPES_CHAT_MESSAGES.EMOJI]: ['😅', '🤬', '😭', '🤯', '🥺', '😩'].map((value, index) => ({
    index,
    value,
  })),
};
