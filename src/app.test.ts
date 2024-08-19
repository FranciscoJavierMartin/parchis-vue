import { describe, test, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import i18n from '@/i18n';
import App from './app.vue';

describe('app.vue', () => {
  test('renders properly', () => {
    const wrapper = mount(App, {
      shallow: true,
      global: {
        plugins: [i18n],
      },
    });

    expect(wrapper).toBeDefined();
  });
});
