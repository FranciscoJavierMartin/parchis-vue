import { describe, expect, test } from 'vitest';
import { mount } from '@vue/test-utils';
import type { TDiceValues } from '@dice/interfaces/dice.interface';
import Dice3d from './dice-face.vue';

describe('dice-face.vue', () => {
  test.each([1, 2, 3, 4, 5, 6])('renders face %i', (value) => {
    const wrapper = mount(Dice3d, {
      props: { value: value as TDiceValues },
    });

    expect(wrapper.find(`.dice-face.dice-${value}`).exists()).toBe(true);
  });
});
