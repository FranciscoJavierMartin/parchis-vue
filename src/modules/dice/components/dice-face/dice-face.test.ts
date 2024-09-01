import { describe, expect, test } from 'vitest';
import { mount } from '@vue/test-utils';
import type { TDiceValues } from '@dice/interfaces/dice.interface';
import Dice3d from './dice-face.vue';

describe('dice-face.vue', () => {
  test.each([1, 2, 3, 4, 5, 6])('renders face %i', (value) => {
    const wrapper = mount(Dice3d, {
      props: { value: value as TDiceValues },
    });

    const face = wrapper.find(`.dice-face.dice-${value}`);
    expect(face.exists()).toBe(true);
    expect(face.classes()).not.contains('animate');
    expect(face.classes()).not.contains('shadow');
    expect(face.exists()).toBe(true);
    expect(getComputedStyle(face.element).width).toBe('29.9px');
  });

  test('custom dice size', () => {
    const wrapper = mount(Dice3d, {
      props: { value: 1, size: 40 },
    });
    const face = wrapper.find('.dice-face');
    expect(getComputedStyle(face.element).width).toBe('40px');
  });

  test('has animate class', () => {
    const wrapper = mount(Dice3d, {
      props: { value: 1, animate: true },
    });
    expect(wrapper.find('.dice-face.animate').exists()).toBe(true);
  });

  test('has shadow class', () => {
    const wrapper = mount(Dice3d, {
      props: { value: 1, shadow: true },
    });
    expect(wrapper.find('.dice-face.shadow').exists()).toBe(true);
  });
});
