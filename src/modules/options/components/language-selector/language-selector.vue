<template>
  <div class="menu-option">
    <DropDown :options="langs" v-model="locale">
      <template #selectedItem="{ item }">
        <div class="option">
          <component :is="item?.data.flag" />
          <span>{{ item?.data.text }}</span>
        </div>
      </template>
      <template #option="{ item }">
        <div class="option">
          <component :is="item.data.flag" />
          <span>{{ item.data.text }}</span>
        </div>
      </template>
    </DropDown>
  </div>
</template>

<script setup lang="ts">
import { useI18n } from 'vue-i18n';
import DropDown from '@common/components/drop-down/drop-down.vue';
import GbFlag from '@common/components/icons/flags/gb.vue';
import EsFlag from '@common/components/icons/flags/es.vue';

const { t, locale } = useI18n();

const langs = [
  { value: 'en', data: { text: t('options.languages.en'), flag: GbFlag } },
  { value: 'es', data: { text: t('options.languages.es'), flag: EsFlag } },
];
</script>

<style scoped>
.menu-option {
  display: flex;
  width: 100%;
  padding-top: 10px;
  color: white;

  .option {
    display: flex;
    gap: 15px;
    align-items: center;
    font-size: 30px;
    font-weight: bold;
    text-transform: capitalize;

    svg {
      height: 25px;
    }
  }
}
</style>
