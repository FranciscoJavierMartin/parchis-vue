<template>
  <PageWrapper>
    <template #leftOption>
      <BackButton />
    </template>
    <template #default>
      <h1>Online</h1>
    </template>
  </PageWrapper>
</template>

<script setup lang="ts">
import PageWrapper from '@/modules/layout/components/wrapper/page-wrapper.vue';
import BackButton from '@/modules/layout/components/back-button/back-button.vue';
</script>
