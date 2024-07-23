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
import PageWrapper from '@/layout/page-wrapper.vue';
import BackButton from '@/components/common/back-button.vue';
</script>
