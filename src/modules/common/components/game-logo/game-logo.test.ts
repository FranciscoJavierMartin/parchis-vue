import { describe, test, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import GameLogo from './game-logo.vue';

describe('game-logo.vue', () => {
  test('renders properly', () => {
    const wrapper = mount(GameLogo);

    expect(wrapper.findAll('.dice-face')).toHaveLength(2);
    expect(wrapper.findAll('.game-logo-letters')).toHaveLength(7);
    expect(wrapper.findAll('.game-token-piece')).toHaveLength(7);

    const name = ['P', 'A', 'R', 'C', 'H', 'I', 'S'];

    wrapper.findAll('.game-logo-letter').forEach((letter, index) => {
      expect(letter.text()).toBe(name[index]);
    });

    expect(wrapper.find('.game-logo-footer').text()).toBe('Party');
  });
});
