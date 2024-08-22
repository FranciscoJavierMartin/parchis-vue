import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest';
import { mount } from '@vue/test-utils';
import Dice3d from './dice-3d.vue';

describe('dice-3d.vue', () => {
  beforeEach(() => {
    vi.useFakeTimers();
  });

  afterEach(() => {
    vi.clearAllTimers();
  });

  test('renders properly', () => {
    const wrapper = mount(Dice3d, {
      props: { size: 30 },
    });

    expect(wrapper.find('.dice-3d').exists()).toBe(true);
    expect(wrapper.find('.dice-3d.animation-none').exists()).toBe(true);
    expect(wrapper.findAll('.dice-face')).toHaveLength(6);
    [1, 2, 3, 4, 5, 6].forEach((value) => {
      expect(wrapper.findAll(`.dice-face.dice-${value}`)).toHaveLength(1);
    });
  });

  test('roll dice', async () => {
    const wrapper = mount(Dice3d, {
      props: { size: 30, rollTime: 10 },
    });

    await wrapper.vm.rollDice(4);
    expect(wrapper.find('.dice-3d.animation-rolling').exists()).toBe(true);
    expect(wrapper.find('.dice-3d.animation-none').exists()).toBe(false);

    await vi.runAllTimers();
    expect(wrapper.find('.dice-3d.animation-none').exists()).toBe(true);
    expect(wrapper.find('.dice-3d.animation-rolling').exists()).toBe(false);
  });
});
