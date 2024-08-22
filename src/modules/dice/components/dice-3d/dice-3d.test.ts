import { describe, expect, test } from 'vitest';
import { mount } from '@vue/test-utils';
import Dice3d from './dice-3d.vue';

describe('dice-3d.vue', () => {
  test('renders properly', () => {
    const wrapper = mount(Dice3d, {
      props: { size: 30 },
    });

    expect(wrapper.find('.dice-3d').exists()).toBe(true);
    expect(wrapper.findAll('.dice-face')).toHaveLength(6);
    [1, 2, 3, 4, 5, 6].forEach((value) => {
      expect(wrapper.findAll(`.dice-face.dice-${value}`)).toHaveLength(1);
    });
  });
});
