<template>
  <slot :onClick="onClick" />
  <ShareModal
    :showModal="!useNativeVersionBrowser && isModalVisible"
    :data="data"
    @close="onCloseModal"
  />
</template>

<script lang="ts" setup>
import { inject, ref } from 'vue';
import { useI18n } from 'vue-i18n';
import ShareModal from '@share/components/share-modal/share-modal.vue';
import { shareLink } from '@share/helpers/share.helper';
import { SHARE_AVAILABLE } from '@share/constants/share.constants';
import { ToastAddToastSymbol } from '@toast/constants/toast.constants';
import type { TAddToastFunction } from '@toast/interfaces/toast.interface';

interface ShareProps {
  /** Data to share */
  data: ShareData;
  /** Disable native share option */
  useNativeOption?: boolean;
}

const props = withDefaults(defineProps<ShareProps>(), { useNativeOption: true });

const useNativeVersionBrowser: boolean = SHARE_AVAILABLE && props.useNativeOption;

const addToast: TAddToastFunction = inject<TAddToastFunction>(ToastAddToastSymbol)!;

const { t } = useI18n();

//#region REFS
const isModalVisible = ref<boolean>(false);
//#endregion

//#region FUNCTIONS
function onClick(): void {
  if (useNativeVersionBrowser) {
    shareLink(props.data)
      .then(() => {
        addToast(t('share.message.success'));
      })
      .catch(() => {
        addToast(t('share.message.error'));
      });
  } else {
    isModalVisible.value = true;
  }
}

function onCloseModal(isShare: boolean = false): void {
  if (isShare) {
    addToast(t('share.message.success'));
  }

  isModalVisible.value = false;
}
//#endregion
</script>
