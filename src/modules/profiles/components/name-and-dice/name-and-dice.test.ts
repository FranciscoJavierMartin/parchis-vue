import { mount } from '@vue/test-utils';
import { describe, expect, test } from 'vitest';
import NameAndDice from './name-and-dice.vue';

describe('name-and-dice.vue', () => {
  test('renders properly', () => {
    const wrapper = mount(NameAndDice, {
      props: {
        name: 'Alice',
        diceAvailable: [],
        hasTurn: false,
      },
    });

    expect(wrapper.find('.game-profile-name-dice').exists()).toBe(true);
    expect(wrapper.find('.game-profile-dices').exists()).toBe(false);
    expect(wrapper.find('.game-profile-name').exists()).toBe(true);
    expect(wrapper.find('.game-profile-name').classes()).not.toContain('has-turn');
    expect(wrapper.find('.game-profile-name').text()).toBe('Alice');
  });
});
