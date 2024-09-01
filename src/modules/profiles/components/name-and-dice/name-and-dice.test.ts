import { describe, expect, test } from 'vitest';
import { mount } from '@vue/test-utils';
import DiceFace from '@dice/components/dice-face/dice-face.vue';
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

  test('has turn', () => {
    const wrapper = mount(NameAndDice, {
      props: {
        name: 'Alice',
        diceAvailable: [],
        hasTurn: true,
      },
    });

    expect(wrapper.find('.game-profile-name').classes()).toContain('has-turn');
    expect(wrapper.find('.game-profile-name').text()).toBe('Alice');
  });

  test('show dices', () => {
    const wrapper = mount(NameAndDice, {
      props: {
        name: 'Alice',
        diceAvailable: [
          { key: 1, value: 3 },
          { key: 2, value: 4 },
        ],
        hasTurn: true,
      },
    });

    expect(wrapper.find('.game-profile-name').exists()).toBe(false);
    expect(wrapper.find('.game-profile-dices').exists()).toBe(true);
    expect(wrapper.findAllComponents(DiceFace)).toHaveLength(2);

    const face3 = wrapper.find('.dice-face.dice-3');
    expect(face3.classes()).toContain('animate');
    expect(face3.classes()).toContain('shadow');

    const face4 = wrapper.find('.dice-face.dice-4');
    expect(face4.classes()).toContain('animate');
    expect(face4.classes()).toContain('shadow');
  });
});
