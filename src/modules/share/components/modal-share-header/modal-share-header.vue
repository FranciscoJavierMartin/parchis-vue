<template>
  <div class="modal-share-header">
    <h4>{{ translatedLabel }}</h4>
    <button @click="$emit('close')">
      <BaseIcon type="close" fill="black" />
    </button>
  </div>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import { useI18n } from 'vue-i18n';
import BaseIcon from '@common/components/icons/base-icon.vue';

interface ModalShareHeaderProps {
  /** Title */
  label?: string;
}

const props = defineProps<ModalShareHeaderProps>();

defineEmits<{
  /** When press close button */
  close: [isShare?: boolean];
}>();

const { t } = useI18n();

//#region COMPUTED
const translatedLabel = computed<string>(() => props.label || t('share.header'));
//#endregion
</script>

<style scoped>
.modal-share-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  margin-bottom: 20px;

  button {
    width: 25px;
    height: 25px;
    cursor: pointer;
    background-color: transparent;
    border: none;
  }
}
</style>
