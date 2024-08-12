<template>
  <slot :onClick="onClick" />
  <ShareModal
    v-if="!useNativeVersionBrowser && isModalVisible"
    :data="data"
    @close="onCloseModal"
  />
</template>

<script lang="ts" setup>
import { inject, ref } from 'vue';
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

//#region REFS
const isModalVisible = ref<boolean>(false);
//#endregion

//#region FUNCTIONS
function onClick(): void {
  if (useNativeVersionBrowser) {
    shareLink(props.data)
      .then(() => {
        addToast('Shared');
      })
      .catch(() => {
        addToast('Error on shared');
      });
  } else {
    isModalVisible.value = true;
  }
}

function onCloseModal(isShare: boolean = false): void {
  if (isShare) {
    addToast('Shared');
  }

  isModalVisible.value = false;
}
//#endregion
</script>
