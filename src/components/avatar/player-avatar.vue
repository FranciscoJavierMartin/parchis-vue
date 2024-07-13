<template>
  <img
    :src="photo"
    :alt="name"
    :onerror="
      (event: ErrorEvent) => {
        (event.currentTarget as HTMLImageElement).src = defaultAvatar;
        (event.currentTarget as HTMLImageElement).onerror = null;
      }
    "
  />
</template>

<script lang="ts" setup>
import defaultAvatar from '@/assets/images/default.png';
interface GameAvatarProps {
  photo?: string;
  name?: string;
}

withDefaults(defineProps<GameAvatarProps>(), {
  photo: '',
  name: '',
});
</script>
