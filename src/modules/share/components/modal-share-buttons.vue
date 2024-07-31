<template>
  <div class="modal-share-buttons">
    <div
      v-for="buttonData of BUTTONS_SHARE_SOCIAL"
      :key="buttonData.label"
      class="modal-share-button"
    >
      <button :title="`Share in ${buttonData.label}`" @click="handleClick(buttonData)">
        <BaseIcon :type="buttonData.icon" fill="black" />
      </button>
      <span>{{ buttonData.label }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { copyToClipboard } from '@debug/helpers/debug';
import type { TButtonShare } from '@share/interfaces/share';
import { BUTTONS_SHARE_SOCIAL } from '@share/constants/share';
import BaseIcon from '@common/components/icons/base-icon.vue';

interface ModalShareButtonsProps {
  data: Omit<ShareData, 'files'>;
}

const props = defineProps<ModalShareButtonsProps>();

const emit = defineEmits<{ close: [isShare?: boolean] }>();

function handleClick(buttonData: TButtonShare): void {
  if (buttonData.action === 'copy') {
    copyToClipboard(`${props.data.text} ${props.data.url}`);
  } else {
    const url: string = Object.keys(props.data).reduce<string>(
      (acc, key) =>
        acc.replace(`DATA_${key.toUpperCase}`, encodeURIComponent(props.data[key as never])),
      (buttonData as { url: string }).url,
    );
    window.open(url, '_blank');
  }

  emit('close', true);
}
</script>

<style scoped>
.modal-share-buttons {
  display: flex;
  justify-content: space-between;
  width: 100%;

  .modal-share-button {
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    width: 25%;

    button {
      width: 40px;
      height: 40px;
      margin-bottom: 5px;
      cursor: pointer;
      background-color: transparent;
      border: none;
    }

    span {
      font-size: 13px;
    }
  }
}
</style>
