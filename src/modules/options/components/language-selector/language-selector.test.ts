import { describe, expect, test } from 'vitest';
import { mount } from '@vue/test-utils';
import i18n from '@/i18n';
import DropDown from '@common/components/drop-down/drop-down.vue';
import GbFlag from '@common/components/icons/flags/gb.vue';
import EsFlag from '@common/components/icons/flags/es.vue';
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

  test('open drop-down', async () => {
    const wrapper = mount(LanguageSelector, {
      global: {
        plugins: [i18n],
      },
    });

    await wrapper.find('.option').trigger('click');

    expect(wrapper.findAll('.option')).toHaveLength(3);

    expect(wrapper.findComponent(GbFlag as any).exists()).toBe(true);
    expect(wrapper.findAll('.option span')[1].text()).toBe('English');
    expect(wrapper.findComponent(EsFlag as any).exists()).toBe(true);
    expect(wrapper.findAll('.option span')[2].text()).toBe('Spanish');
  });

  test('click on new language', async () => {
    const wrapper = mount(LanguageSelector, {
      global: {
        plugins: [i18n],
      },
    });

    await wrapper.find('.option').trigger('click');
    await wrapper.findAll('.option')[2].trigger('click');

    expect(wrapper.findAll('.option')).toHaveLength(1);
    expect(wrapper.findComponent(EsFlag as any).exists()).toBe(true);
    expect(wrapper.find('.option span').text()).toBe('Spanish');
  });
});
