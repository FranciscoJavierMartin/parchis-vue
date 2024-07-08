<template>
  <!-- <img
    :src="photo"
    :alt="name"
    :class="[className]"
   
  /> -->
  <img src="https://bitsofco.de/broken.jpg" alt="Kanye Laughing" />
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
  background: no-repeat url('/default.png');
  background-size: contain;
  display: block;
  -moz-box-sizing: border-box;
  box-sizing: border-box;
  width: 50px;
  height: 50px;
  padding-left: 50px;
}
</style>
