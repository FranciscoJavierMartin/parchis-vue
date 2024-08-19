<template>
  <PageWrapper>
    <template #leftOption>
      <BackButton />
    </template>
    <template #default>
      <div class="online-page">
        <h1>Online</h1>
        <p>Online game is not available yet.</p>
      </div>
    </template>
  </PageWrapper>
</template>

<script setup lang="ts">
import PageWrapper from '@layouts/components/wrapper/page-wrapper/page-wrapper.vue';
import BackButton from '@layouts/components/back-button/back-button/back-button.vue';
</script>

<style scoped>
.online-page {
  width: 80%;
  padding: 25px;
  margin-top: 40px;
  color: white;
  text-align: center;
  background-color: rgb(0 37 78 / 60%);
  border-radius: 10px;
  box-shadow:
    rgba(0, 0, 0, 0.4) 0px 2px 4px,
    rgba(0, 0, 0, 0.3) 0px 7px 13px -3px,
    rgba(0, 0, 0, 0.2) 0px -3px 0px inset;
  animation: fadeInLeft 500ms ease both;
}
</style>
