import { describe, expect, test } from 'vitest';
import { mount } from '@vue/test-utils';
import i18n from '@/i18n';
import ModalShareButtons from './modal-share-buttons.vue';

describe('modal-share-buttons.vue', () => {
  test('renders properly', () => {
    const wrapper = mount(ModalShareButtons, {
      props: {
        data: {
          text: 'Text test',
          title: 'Title test',
          url: 'my-url',
        },
      },
      global: {
        plugins: [i18n],
      },
    });

    expect(wrapper.find('.modal-share-buttons').exists()).toBe(true);
    expect(wrapper.findAll('.modal-share-button')).toHaveLength(4);
  });

  test.for([
    ['Share in Copy', 'Copy', 'copy'],
    ['Share in X (Twitter)', 'X (Twitter)', 'twitter'],
    ['Share in Facebook', 'Facebook', 'facebook'],
    ['Share in Linkedin', 'Linkedin', 'linkedin'],
  ])('renders %s button', ([buttonTitle, label, icon]) => {
    const wrapper = mount(ModalShareButtons, {
      props: {
        data: {
          text: 'Text test',
          title: 'Title test',
          url: 'my-url',
        },
      },
      global: {
        plugins: [i18n],
      },
    });

    expect(wrapper.find(`button[title="${buttonTitle}"]`).exists()).toBe(true);
    expect(wrapper.find(`button .icon-${icon}`).exists()).toBe(true);
    expect(wrapper.find(`.modal-share-button button[title="${buttonTitle}"] + span`).text()).toBe(
      label,
    );
  });
});
