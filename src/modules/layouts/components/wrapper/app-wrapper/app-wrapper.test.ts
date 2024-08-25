import { shallowMount } from '@vue/test-utils';
import { describe, expect, test } from 'vitest';
import AppWrapper from './app-wrapper.vue';

describe('app-wrapper.vue', () => {
  test('renders properly', () => {
    const wrapper = shallowMount(AppWrapper, { shallow: true });

    expect(wrapper.exists()).toBe(true);
  });
});
