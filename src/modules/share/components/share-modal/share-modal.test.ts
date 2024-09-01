import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest';
import { mount } from '@vue/test-utils';
import i18n from '@/i18n';
import { ToastAddToastSymbol } from '@toast/constants/toast.constants';
import BaseModal from '@layouts/components/base-modal/base-modal.vue';
import ShareModal from './share-modal.vue';

describe('share-modal.vue', () => {
  beforeEach(() => {
    // create teleport target
    const el = document.createElement('div');
    el.id = 'screen';
    document.body.appendChild(el);
  });

  afterEach(() => {
    document.body.innerHTML = '';
  });

  test.skip('renders properly', () => {
    const wrapper = mount(ShareModal, {
      props: {
        data: {
          text: 'Shared text',
          title: 'Shared title',
          url: 'my-url',
        },
        showModal: true,
      },
      global: {
        plugins: [i18n],
        provide: {
          [ToastAddToastSymbol]: vi.fn(),
        },
      },
    });

    expect(wrapper.findComponent(BaseModal).exists()).toBe(true);
    expect(wrapper.find('.modal-share-wrapper').exists()).toBe(true);
  });
});
