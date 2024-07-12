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
// TODO: Rename component to PlayerAvatar
import defaultAvatar from '@/assets/default.png';
interface GameAvatarProps {
  photo?: string;
  name?: string;
}

withDefaults(defineProps<GameAvatarProps>(), {
  photo: '',
  name: '',
});
</script>
