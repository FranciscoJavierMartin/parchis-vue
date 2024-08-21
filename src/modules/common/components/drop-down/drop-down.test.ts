import { describe, test, expect } from 'vitest';
import { mount } from '@vue/test-utils';
import DropDown from './drop-down.vue';

describe('drop-down.vue', () => {
  test('renders without options', () => {
    const wrapper = mount(DropDown, {
      props: {
        options: [],
      },
    });

    expect(wrapper.find('.items').exists()).toBe(false);
    expect(wrapper.find('.selected').exists()).toBe(true);
    expect(wrapper.find('.selected').classes()).not.contains('open');
  });

  test('renders with options closed', () => {
    const wrapper = mount(DropDown, {
      props: {
        options: [
          {
            value: 'option1',
            data: {
              text: 'Option 1',
            },
          },
          {
            value: 'option2',
            data: {
              text: 'Option 2',
            },
          },
        ],
      },
    });

    expect(wrapper.find('.items').exists()).toBe(false);
    expect(wrapper.find('.selected').exists()).toBe(true);
    expect(wrapper.find('.selected').classes()).not.contains('open');
  });

  test('click on drop down', async () => {
    const wrapper = mount(DropDown, {
      props: {
        options: [
          {
            value: 'option1',
            data: {
              text: 'Option 1',
            },
          },
          {
            value: 'option2',
            data: {
              text: 'Option 2',
            },
          },
        ],
      },
    });

    const selectedElement = wrapper.find('.selected');

    await selectedElement.trigger('click');

    expect(selectedElement.classes()).contains('open');
    expect(wrapper.find('.items').exists()).toBe(true);
    expect(wrapper.findAll('.item')).toHaveLength(2);
  });

  test('click on item', async () => {
    const wrapper = mount(DropDown, {
      props: {
        options: [
          {
            value: 'option1',
            data: {
              text: 'Option 1',
            },
          },
          {
            value: 'option2',
            data: {
              text: 'Option 2',
            },
          },
        ],
      },
    });

    const selectedElement = wrapper.find('.selected');

    await selectedElement.trigger('click');

    expect(selectedElement.classes()).contains('open');

    await wrapper.find('.item').trigger('click');

    expect(selectedElement.classes()).not.contains('open');
    expect(wrapper.find('.items').exists()).toBe(false);
  });
});
