<template>
  <img
    :src="photo || defaultImage"
    :alt="name"
    :class="[className]"
    @error="
      (event: Event) => {
        (event.currentTarget as any).onerror = null;
        (event.currentTarget as any).src = '@/assets/default.png';
      }
    "
  />
</template>

<script lang="ts" setup>
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
