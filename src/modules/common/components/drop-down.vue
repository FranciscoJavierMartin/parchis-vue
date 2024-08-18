<template>
  <div class="drop-down" :tabindex="tabindex" @blur="open = false">
    <div class="selected" :class="{ open }" @click="open = !open">
      <slot name="selectedItem" :item="selectedItem" />
    </div>
    <ul class="items" v-if="open">
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
  // TODO: Add backgroundColor, activeColor, borderColor
}

const props = withDefaults(defineProps<DropDownProps>(), { tabindex: 0 });

const open = ref<boolean>(false);
const selected = ref<string | number | null>(
  props.options.length > 0 ? props.options[0].value : null,
);

const emit = defineEmits<{ input: [selected: string | number] }>();

const selectedItem = computed(() =>
  props.options.find((option) => option.value === selected.value),
);

function selectItem(value: string | number): void {
  selected.value = value;
  open.value = false;
  emit('input', value);
}

onMounted(() => {
  emit('input', selected.value!);
});
</script>

<style scoped>
.drop-down {
  position: relative;
  width: 100%;
  height: 47px;
  line-height: 47px;
  text-align: left;
  outline: none;

  .selected {
    padding-left: 8px;
    color: white;
    cursor: pointer;
    user-select: none;
    background-color: #080d0e;
    border: 1px solid #858586;
    border-radius: 6px;

    &.open {
      border: 1px solid #ce9b2c;
      border-radius: 6px 6px 0 0;
    }

    &:after {
      /* TODO: Increase size */
      position: absolute;
      top: 22px;
      right: 10px;
      width: 0;
      height: 0;
      content: '';
      border: 4px solid transparent;
      border-color: white transparent transparent transparent;
    }
  }

  .items {
    position: absolute;
    right: 0;
    left: 0;
    overflow: hidden;
    color: white;
    background-color: #080d0e;
    border-right: 1px solid #ce9b2c;
    border-bottom: 1px solid #ce9b2c;
    border-left: 1px solid #ce9b2c;
    border-radius: 0 0 6px 6px;

    .item {
      padding-left: 8px;
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
