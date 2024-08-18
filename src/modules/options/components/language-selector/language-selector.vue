<template>
  <div class="menu-option">
    <!-- <select v-model="locale">
      <option v-for="(lang, i) in langs" :key="`Lang${i}`" :value="lang.code">
        {{ lang.text }}
      </option>
    </select> -->
    <DropDown :options="langs">
      <template #selectedItem="{ item }">
        <div>
          <h1>{{ item?.data.text }}</h1>
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
import { ref } from 'vue';
import { useI18n } from 'vue-i18n';
import DropDown from '@common/components/drop-down.vue';
import GbFlag from '@common/components/icons/flags/gb.vue';
import EsFlag from '@common/components/icons/flags/es.vue';

const { t, locale } = useI18n();

const langs = ref([
  { value: 'en', data: { text: 'English', flag: GbFlag } },
  { value: 'es', data: { text: 'Spanish', flag: EsFlag } },
]);
</script>

<style scoped>
.menu-option {
  display: flex;
  align-items: center;
  width: 100%;
  padding-bottom: 15px;
  color: white;
  border-bottom: 1px solid #8c8792;

  select {
    width: 100%;
    height: 100%;
  }

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
