import { describe, expect, test } from 'vitest';
import { mount } from '@vue/test-utils';
import i18n from '@/i18n';
import DropDown from '@common/components/drop-down/drop-down.vue';
import GbFlag from '@common/components/icons/flags/gb.vue';
import LanguageSelector from './language-selector.vue';

describe('language-selector.vue', () => {
  test('renders properly', () => {
    const wrapper = mount(LanguageSelector, {
      global: {
        plugins: [i18n],
      },
    });

    expect(wrapper.find('.menu-option').exists()).toBe(true);
    expect(wrapper.findComponent(DropDown as any).exists()).toBe(true);
    expect(wrapper.findAll('.option')).toHaveLength(1);
    expect(wrapper.findComponent(GbFlag as any).exists()).toBe(true);
    expect(wrapper.find('.option span').text()).toBe('English');
  });
});
