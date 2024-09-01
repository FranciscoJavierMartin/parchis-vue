import { describe, expect, test } from 'vitest';
import { mount } from '@vue/test-utils';
import PageWrapper from './page-wrapper.vue';

describe('page-wrapper.vue', () => {
  test('renders properly', () => {
    const wrapper = mount(PageWrapper);

    expect(wrapper.find('.page-wrapper').exists()).toBe(true);
  });
});
