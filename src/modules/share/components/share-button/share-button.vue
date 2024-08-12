<template>
  <slot :onClick="onClick" />
  <ShareModal
    v-if="!useNativeVersionBrowser && isModalVisible"
    :data="data"
    @close="onCloseModal"
  />
  <ToastFeedback v-if="feedbackText" :text="feedbackText" />
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import ShareModal from '@share/components/share-modal/share-modal.vue';
import { shareLink } from '@share/helpers/share.helper';
import { SHARE_AVAILABLE } from '@share/constants/share.constants';
import ToastFeedback from '@/modules/common/components/toast-feedback/toast-feedback.vue';

interface ShareProps {
  /** Data to share */
  data: ShareData;
  /** Disable native share option */
  useNativeOption?: boolean;
}

const props = withDefaults(defineProps<ShareProps>(), { useNativeOption: true });

const useNativeVersionBrowser: boolean = SHARE_AVAILABLE && props.useNativeOption;

//#region REFS
const isModalVisible = ref<boolean>(false);
const feedbackText = ref<string>('');
//#endregion

//#region FUNCTIONS
function onClick(): void {
  if (useNativeVersionBrowser) {
    shareLink(props.data);
  } else {
    isModalVisible.value = true;
  }
}

function onCloseModal(isShare: boolean = false): void {
  if (isShare) {
    // TODO: Show toast with successful message
  }

  isModalVisible.value = false;
}
//#endregion
</script>
