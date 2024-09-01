import { describe, expect, test, vi } from 'vitest';
import { mount } from '@vue/test-utils';
import {
  ToastMessagesSymbol,
  ToastRemoveToastSymbol,
} from '@/modules/toast/constants/toast.constants';
import AppContainer from './app-container.vue';

describe('app-container.vue', () => {
  test('renders properly', () => {
    const wrapper = mount(AppContainer, {
      global: {
        provide: {
          [ToastMessagesSymbol]: [],
          [ToastRemoveToastSymbol]: vi.fn(),
        },
      },
    });

    expect(wrapper.find('.container').exists()).toBe(true);
    expect(wrapper.find('.screen#screen').exists()).toBe(true);
    expect(wrapper.find('.toast-container').exists()).toBe(true);
  });
});
