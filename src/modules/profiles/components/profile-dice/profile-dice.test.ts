import { describe, expect, test } from 'vitest';
import { mount } from '@vue/test-utils';
import Dice3d from '@dice/components/dice-3d/dice-3d.vue';
import ProfileDice from './profile-dice.vue';

describe('profile-dice.vue', () => {
  test('renders properly', () => {
    const wrapper = mount(ProfileDice, {
      props: {
        diceRollNumber: 0,
        disabledDice: false,
        showDice: true,
        value: 1,
      },
    });

    expect(wrapper.find('.game-profile-dice').exists()).toBe(true);
    expect(wrapper.find('.game-profile-dice').classes()).not.toContain('hide');
    expect(wrapper.find('.icon-arrow').exists()).toBe(true);
    expect(wrapper.find('button.game-profile-dice-button').exists()).toBe(true);
    expect(wrapper.findComponent(Dice3d).exists()).toBe(true);
  });

  test('disable dice', () => {
    const wrapper = mount(ProfileDice, {
      props: {
        diceRollNumber: 0,
        disabledDice: true,
        showDice: true,
        value: 1,
      },
    });

    expect(wrapper.find('button.game-profile-dice-button').attributes()['disabled']).toBe('');
  });

  test('emit select dice', async () => {
    const wrapper = mount(ProfileDice, {
      props: {
        diceRollNumber: 0,
        disabledDice: false,
        showDice: true,
        value: 1,
      },
    });

    await wrapper.find('button').trigger('click');
    expect(wrapper.emitted()).toHaveProperty('handleSelectDice');
  });
});
