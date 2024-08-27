import { describe, expect, test } from 'vitest';
import { mount } from '@vue/test-utils';
import i18n from '@/i18n';
import type { TPlayerRankingPosition } from '@profiles/interfaces/profile.interface';
import ProfileRanking from './profile-ranking.vue';

describe('profile-ranking.vue', () => {
  test.for([
    [1, '1st'],
    [2, '2nd'],
    [3, '3rd'],
    [4, '4th'],
  ])('renders %i position', ([value, expected]) => {
    const wrapper = mount(ProfileRanking, {
      props: {
        value: value as TPlayerRankingPosition,
      },
      global: {
        plugins: [i18n],
      },
    });

    expect(wrapper.find('.game-profile-ranking').exists()).toBe(true);
    expect(wrapper.find('.game-profile-ranking-value').exists()).toBe(true);
    expect(wrapper.find('.game-profile-ranking-value').text()).toBe(expected);
  });
});
