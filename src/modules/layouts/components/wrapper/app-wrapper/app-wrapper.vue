<template>
  <OptionsGameProvider>
    <ToastFeedbackProvider>
      <AppContainer>
        <slot />
      </AppContainer>
    </ToastFeedbackProvider>
  </OptionsGameProvider>
</template>

<script setup lang="ts">
import ToastFeedbackProvider from '@toast/providers/toast-feedback.provider';
import AppContainer from '@layouts/components/wrapper/app-container/app-container.vue';
import OptionsGameProvider from '@sounds/providers/options-game.provider';
</script>
