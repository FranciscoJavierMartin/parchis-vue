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

  test('show empty list', () => {
    const wrapper = mount(ToastFeedback, {
      global: {
        provide: {
          [ToastRemoveToastSymbol]: vi.fn(),
          [ToastMessagesSymbol]: [],
        },
      },
    });

    expect(wrapper.find('.toast-container').exists()).toBe(true);
    expect(wrapper.find('.toast-list').exists()).toBe(false);
  });

  test('click on message to remove', async () => {
    const removeFn = vi.fn();
    const wrapper = mount(ToastFeedback, {
      global: {
        provide: {
          [ToastRemoveToastSymbol]: removeFn,
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

    await wrapper.findAll('.toast-message')[0].trigger('click');

    expect(removeFn).toHaveBeenCalledWith('asdf');
  });
});
