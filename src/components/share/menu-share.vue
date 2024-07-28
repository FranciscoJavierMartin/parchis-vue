<template>
  <slot :onClick="onClick" />
</template>

<script lang="ts" setup>
import { SHARE_AVAILABLE, shareLink } from '@/helpers/share';

interface ShareProps {
  data: ShareData;
  useNativeOption?: boolean;
}

const props = withDefaults(defineProps<ShareProps>(), { useNativeOption: true });

const useNativeVersionBrowser: boolean = SHARE_AVAILABLE && props.useNativeOption;

function onClick(): void {
  if (useNativeVersionBrowser) {
    shareLink(props.data);
  }
}
</script>
