<template>
  <div>
    <button @click="updateClick">Click me</button>
  </div>
</template>

<script setup lang="ts">
const color = defineModel<string>();

function updateClick(): void {
  color.value = 'Click me';
}
</script>
