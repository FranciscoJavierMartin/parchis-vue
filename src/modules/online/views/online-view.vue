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
import PageWrapper from '@layouts/components/wrapper/page-wrapper/page-wrapper.vue';
import BackButton from '@layouts/components/back-button/back-button/back-button.vue';
</script>
