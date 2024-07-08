<template>
  <!-- <img
    :src="photo"
    :alt="name"
    :class="[className]"
   
  /> -->
  <img src="https://bitsofco.de/broken.jpg" alt="Kanye Laughing">
</template>

<script lang="ts" setup>
// TODO: Rename component to PlayerAvatar
import defaultImage from '@/assets/default.png';
interface GameAvatarProps {
  photo?: string;
  name?: string;
  className?: string;
}

withDefaults(defineProps<GameAvatarProps>(), {
  photo: '',
  name: '',
  className: '',
});
</script>

<style scoped>
img {
  font-family: 'Helvetica';
  font-weight: 300;
  line-height: 2;
  text-align: center;

  width: 100%;
  height: auto;
  display: block;
  position: relative;
}
</style>