<template>
  <div class="modal-share-buttons">
    <div
      v-for="buttonData of BUTTONS_SHARE_SOCIAL"
      :key="buttonData.label"
      class="modal-share-button"
    >
      <button
        :title="t('share.buttonTitle', { label: t(`share.buttons.${buttonData.label}`) })"
        @click="handleClick(buttonData)"
      >
        <BaseIcon :type="buttonData.icon" fill="black" />
      </button>
      <span>{{ t(`share.buttons.${buttonData.label}`) }}</span>
    </div>
  </div>
</template>

<script setup lang="ts">
import { copyToClipboard } from '@common/helpers/copy-to-clipboard.helper';
import BaseIcon from '@common/components/icons/base-icon.vue';
import type { TButtonShare } from '@share/interfaces/share.interface';
import { BUTTONS_SHARE_SOCIAL } from '@share/constants/share.constants';
import { shareWithSocialNetwork } from '@share/helpers/share.helper';
import { useI18n } from 'vue-i18n';

interface ModalShareButtonsProps {
  /** Data to share */
  data: Omit<ShareData, 'files'>;
}

const props = defineProps<ModalShareButtonsProps>();

const emit = defineEmits<{
  /** When press close button */
  close: [isShare?: boolean];
}>();

const { t } = useI18n();

//#region FUNCTIONS
function handleClick(buttonData: TButtonShare): void {
  if (buttonData.action === 'copy') {
    copyToClipboard(`${props.data.text} ${props.data.url}`);
  } else {
    shareWithSocialNetwork(props.data, (buttonData as { url: string }).url);
  }

  emit('close', true);
}
//#endregion
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
