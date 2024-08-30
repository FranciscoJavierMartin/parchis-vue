import { afterEach, beforeEach, describe, expect, test, vi } from 'vitest';
import { mount } from '@vue/test-utils';
import i18n from '@/i18n';
import ShareModal from '@share/components/share-modal/share-modal.vue';
import ShareButton from './share-button.vue';
import { ToastAddToastSymbol } from '@/modules/toast/constants/toast.constants';

describe('share-button.vue', () => {
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
    const wrapper = mount(ShareButton, {
      props: {
        data: {
          text: 'Shared text',
          title: 'Shared title',
          url: 'my-url',
        },
      },
      global: {
        plugins: [i18n],
        provide: {
          [ToastAddToastSymbol]: vi.fn(),
        },
      },
    });

    expect(wrapper.findComponent(ShareModal).exists()).toBe(true);
  });
});
