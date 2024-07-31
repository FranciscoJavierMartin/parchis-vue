<template>
  <OptionsGameProvider>
    <AppContainer>
      <slot />
    </AppContainer>
  </OptionsGameProvider>
</template>

<script setup lang="ts">
import AppContainer from '@layouts/components/wrapper/app-container.vue';
import OptionsGameProvider from '@sounds/provider/options-game-provider';
</script>
