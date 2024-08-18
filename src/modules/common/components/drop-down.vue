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

<style scoped>
.drop-down {
  position: relative;
  width: 100%;
  text-align: left;
  outline: none;
  height: 47px;
  line-height: 47px;

  .selected {
    background-color: #080d0e;
    border-radius: 6px;
    border: 1px solid #858586;
    color: white;
    padding-left: 8px;
    cursor: pointer;
    user-select: none;

    &.open {
      border: 1px solid #ce9b2c;
      border-radius: 6px 6px 0 0;
    }

    &:after {
      position: absolute;
      content: '';
      top: 22px;
      right: 10px;
      width: 0;
      height: 0;
      border: 4px solid transparent;
      border-color: white transparent transparent transparent;
    }
  }

  .items {
    color: white;
    border-radius: 0 0 6px 6px;
    overflow: hidden;
    border-right: 1px solid #ce9b2c;
    border-left: 1px solid #ce9b2c;
    border-bottom: 1px solid #ce9b2c;
    position: absolute;
    background-color: #080d0e;
    left: 0;
    right: 0;

    &.selectHide {
      display: none;
    }

    .item {
      color: white;
      padding-left: 8px;
      cursor: pointer;
      user-select: none;

      &:hover {
        background-color: #b68a28;
      }
    }
  }
}
</style>
