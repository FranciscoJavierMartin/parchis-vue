import { beforeEach, describe, test, afterEach } from 'vitest';
import { mount } from '@vue/test-utils';
import i18n from '@/i18n';
import BackConfirmationModal from './back-confirmation-modal.vue';

describe('back-confirmation-modal.vue', () => {
  beforeEach(() => {
    // create teleport target
    const el = document.createElement('div');
    el.id = 'screen';
    document.body.appendChild(el);
  });

  afterEach(() => {
    document.body.innerHTML = '';
  });

  test('renders properly', () => {
    const wrapper = mount(BackConfirmationModal, {
      props: { showModal: true },
      global: {
        plugins: [i18n],
      },
    });

    // expect(wrapper.find('.confirm-modal').exists()).toBe(true);
  });
});
