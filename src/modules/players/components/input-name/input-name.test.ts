import { describe, expect, test } from 'vitest';
import { mount } from '@vue/test-utils';
import InputName from './input-name.vue';
import i18n from '@/i18n';

describe('input-name.vue', () => {
  test('renders properly', async () => {
    const wrapper = mount(InputName, {
      props: {
        disabled: false,
      },
      global: {
        plugins: [i18n],
      },
    });

    const input = wrapper.find('input');
    expect(input.exists()).toBe(true);
    expect(input.attributes()['aria-label']).toBe('Player name');
    expect(input.attributes()['placeholder']).toBe('Player name');
    expect(input.attributes()['disabled']).toBeUndefined();
  });

  test('update input', async () => {
    const wrapper = mount(InputName, {
      props: {
        disabled: false,
        modelValue: '',
        'onUpdate:modelValue': async (e) => wrapper.setProps({ modelValue: e }),
      },
      global: {
        plugins: [i18n],
      },
    });

    expect(wrapper.props('modelValue')).toBe('');

    const input = wrapper.find('input');
    await input.setValue('Hello');
    expect(wrapper.props('modelValue')).toBe('Hello');
  });
});
