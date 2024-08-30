import { describe, expect, test, vi } from 'vitest';
import { mount } from '@vue/test-utils';
import { ToastMessagesSymbol, ToastRemoveToastSymbol } from '@toast/constants/toast.constants';
import ToastFeedback from './toast-feedback.vue';

describe('toast-feedback.vue', () => {
  test('renders properly', () => {
    const wrapper = mount(ToastFeedback, {
      global: {
        provide: {
          [ToastRemoveToastSymbol]: vi.fn(),
          [ToastMessagesSymbol]: [
            {
              message: 'message 1',
              id: 'asdf',
            },
            {
              message: 'message 2',
              id: 'qwert',
            },
          ],
        },
      },
    });

    expect(wrapper.find('.toast-container').exists()).toBe(true);
    expect(wrapper.find('.toast-list').exists()).toBe(true);
    expect(wrapper.findAll('.toast-message')).toHaveLength(2);
  });
});
