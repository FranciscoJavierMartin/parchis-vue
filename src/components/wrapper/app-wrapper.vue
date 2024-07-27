<template>
  <OptionsGameProvider>
    <AppContainer>
      <slot />
    </AppContainer>
  </OptionsGameProvider>
</template>

<script setup lang="ts">
import AppContainer from '@/components/wrapper/app-container.vue';
import OptionsGameProvider from '@/providers/options-game-provider';
</script>
