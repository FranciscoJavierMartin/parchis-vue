<template>
  <OptionsGameProvider>
    <AppContainer>
      <slot />
    </AppContainer>
  </OptionsGameProvider>
</template>

<script setup lang="ts">
import AppContainer from '@layouts/components/wrapper/app-container/app-container.vue';
import OptionsGameProvider from '@sounds/providers/options-game.provider';
</script>
