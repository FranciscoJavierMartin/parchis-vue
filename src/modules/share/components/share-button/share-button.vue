<template>
  <slot :onClick="onClick" />
  <ShareModal
    v-if="!useNativeVersionBrowser && isModalVisible"
    :data="data"
    @close="onCloseModal"
  />
</template>

<script lang="ts" setup>
import { ref } from 'vue';
import ShareModal from '@/modules/share/components/share-modal/share-modal.vue';
import { shareLink } from '@share/helpers/share';
import { SHARE_AVAILABLE } from '@/modules/share/constants/share.constants';

interface ShareProps {
  data: ShareData;
  useNativeOption?: boolean;
}

const props = withDefaults(defineProps<ShareProps>(), { useNativeOption: true });

const useNativeVersionBrowser: boolean = SHARE_AVAILABLE && props.useNativeOption;
const isModalVisible = ref<boolean>(false);

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
</script>
