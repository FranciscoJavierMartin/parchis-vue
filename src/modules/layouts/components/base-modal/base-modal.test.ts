import { describe, expect, test, beforeEach, afterEach } from 'vitest';
import { mount } from '@vue/test-utils';
import BaseModal from './base-modal.vue';

describe('base-modal.vue', () => {
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
    const wrapper = mount(BaseModal, {
      props: {
        showModal: true,
      },
    });

    expect(wrapper.find('.modal-overlay').exists()).toBe(true);
  });
});
