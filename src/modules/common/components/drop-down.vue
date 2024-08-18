<template>
  <div class="drop-down" :tabindex="tabindex" @blue="open = false">
    <div class="selected" :class="{ open }" @click="open = !open">
      {{ selected }}
    </div>
    <div class="items" :class="{ selectHide: !open }">
      <div
        v-for="(option, index) of options"
        :key="index"
        @click="
          selected = option;
          open = false;
          $emit('input', option);
        "
        class="item"
      >
        {{ option }}
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue';

interface DropDownProps {
  options: any[];
  tabindex?: number;
}

const props = withDefaults(defineProps<DropDownProps>(), { tabindex: 0 });

const open = ref<boolean>(false);
const selected = ref<any>(props.options.length > 0 ? props.options[0] : null);

const emit = defineEmits<{ input: [selected: any] }>();

onMounted(() => {
  emit('input', selected.value);
});
</script>
