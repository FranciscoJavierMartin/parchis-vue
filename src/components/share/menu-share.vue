<template>
  <slot :onClick="onClick" />
</template>

<script lang="ts" setup>
interface ShareProps {
  data: ShareData;
  useNativeOption?: boolean;
}

withDefaults(defineProps<ShareProps>(), { useNativeOption: true });

function onClick(): void {
  console.log('Hello');
}
</script>
