<template>
  <OptionsGameProvider>
    <AppContainer>
      <slot />
    </AppContainer>
  </OptionsGameProvider>
</template>

<script setup lang="ts">
import AppContainer from '@/modules/layout/components/wrapper/app-container.vue';
import OptionsGameProvider from '@/modules/sounds/provider/options-game-provider';
</script>
