import { describe, test, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import GameOverRibbon from './game-over-ribbon.vue';

describe('game-over-ribbon.vue', () => {
  test('renders properly', () => {
    const wrapper = mount(GameOverRibbon, {
      props: {
        title: 'My title',
      },
    });

    expect(wrapper.find('.game-over-ribbon').exists()).toBe(true);
    expect(wrapper.find('.game-over-ribbon .ribbon-content').exists()).toBe(true);
    expect(wrapper.find('.game-over-ribbon .ribbon-content b').text()).toBe('My title');
  });

  test('renders without text', () => {
    const wrapper = mount(GameOverRibbon);

    expect(wrapper.find('.game-over-ribbon').exists()).toBe(true);
    expect(wrapper.find('.game-over-ribbon .ribbon-content').exists()).toBe(true);
    expect(wrapper.find('.game-over-ribbon .ribbon-content b').text()).toBe('');
  });
});
