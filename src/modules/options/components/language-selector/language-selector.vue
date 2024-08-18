<template>
  <div class="menu-option">
    <!-- <select v-model="locale">
      <option v-for="(lang, i) in langs" :key="`Lang${i}`" :value="lang.code">
        {{ lang.text }}
      </option>
    </select> -->
    <DropDown :options="['Hello', 'Bye']" />
  </div>
</template>

<script setup lang="ts">
import DropDown from '@common/components/drop-down.vue';
import { ref } from 'vue';
import { useI18n } from 'vue-i18n';

const { t, locale } = useI18n();

const langs = ref([
  { code: 'en', text: 'English' },
  { code: 'es', text: 'Spanish' },
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
}
</style>
