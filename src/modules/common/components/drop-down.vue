<template>
  <div class="drop-down" :tabindex="tabindex" @blur="isOpen = false">
    <div class="selected" :class="{ open: isOpen }" @click="isOpen = !isOpen">
      <slot name="selectedItem" :item="selectedItem" />
    </div>
    <ul class="items" v-if="isOpen">
      <li
        v-for="(option, index) of options"
        :key="index"
        class="item"
        @click="selectItem(option.value)"
      >
        <slot name="option" :item="option" />
      </li>
    </ul>
  </div>
</template>

<script setup lang="ts" generic="T">
import { computed, onMounted, ref } from 'vue';

interface DropDownProps {
  options: { value: string | number; data: T }[];
  tabindex?: number;
  backgroundColor?: string;
  // TODO: Add activeColor, borderColor, className (for top element)
}

const props = withDefaults(defineProps<DropDownProps>(), {
  tabindex: 0,
  backgroundColor: 'var(--dark-gray)',
});

//#region REFS
const isOpen = ref<boolean>(false);
const selected = defineModel<string | number | null>({ default: null });
//#endregion

//#region COMPUTED
const selectedItem = computed(() =>
  props.options.find((option) => option.value === selected.value),
);
//#endregion

//#region FUNCTIONS
function selectItem(value: string | number): void {
  selected.value = value as string;
  isOpen.value = false;
}
//#endregion

onMounted(() => {
  selected.value = props.options.length ? props.options[0].value : '';
});
</script>

<style scoped>
.drop-down {
  position: relative;
  width: 100%;
  height: 47px;
  line-height: 47px;
  outline: none;

  .selected {
    padding-left: 10px;
    color: white;
    cursor: pointer;
    user-select: none;
    background-color: v-bind(backgroundColor);
    border: 1px solid #858586;
    border-radius: 6px;

    &.open {
      border: 1px solid #ce9b2c;
      border-radius: 6px 6px 0 0;
    }

    &:after {
      position: absolute;
      top: 22px;
      right: 10px;
      width: 0;
      height: 0;
      content: '';
      border: 7px solid transparent;
      border-color: white transparent transparent transparent;
    }
  }

  .items {
    position: absolute;
    right: 0;
    left: 0;
    overflow: hidden;
    color: white;
    background-color: v-bind(backgroundColor);
    border-right: 1px solid #ce9b2c;
    border-bottom: 1px solid #ce9b2c;
    border-left: 1px solid #ce9b2c;
    border-radius: 0 0 6px 6px;

    .item {
      padding-left: 15px;
      color: white;
      cursor: pointer;
      user-select: none;

      &:hover {
        background-color: #b68a28;
      }
    }
  }
}
</style>
