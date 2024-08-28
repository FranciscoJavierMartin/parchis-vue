import { describe, expect, test } from 'vitest';
import { mount } from '@vue/test-utils';
import ModalShareHeader from './modal-share-header.vue';
import i18n from '@/i18n';

describe('modal-share-header.vue', () => {
  test('renders properly', () => {
    const wrapper = mount(ModalShareHeader, {
      global: {
        plugins: [i18n],
      },
    });

    expect(wrapper.find('.modal-share-header').exists()).toBe(true);
    expect(wrapper.find('h4').text()).toBe('Share...');
    expect(wrapper.find('button .icon-close').exists()).toBe(true);
  });

  test('with custom label', () => {
    const wrapper = mount(ModalShareHeader, {
      props: {
        label: 'Custom label',
      },
      global: {
        plugins: [i18n],
      },
    });

    expect(wrapper.find('.modal-share-header').exists()).toBe(true);
    expect(wrapper.find('h4').text()).toBe('Custom label');
    expect(wrapper.find('button .icon-close').exists()).toBe(true);
  });

  test('emit close when click on button', async () => {
    const wrapper = mount(ModalShareHeader, {
      global: {
        plugins: [i18n],
      },
    });

    await wrapper.find('button').trigger('click');
    expect(wrapper.emitted()).toHaveProperty('close');
  });
});
