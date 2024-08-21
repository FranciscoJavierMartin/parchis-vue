<!-- eslint-disable vuejs-accessibility/no-static-element-interactions -->
<!-- eslint-disable vuejs-accessibility/click-events-have-key-events -->
<template>
  <!-- TODO: Make component accesible -->
  <div class="drop-down" :tabindex="tabindex" @blur="isOpen = false">
    <button class="selected" :class="{ open: isOpen }" @click="isOpen = !isOpen">
      <slot name="selectedItem" :item="selectedItem" />
    </button>
    <Transition name="fold">
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
    </Transition>
  </div>
</template>

<script setup lang="ts" generic="T">
import { computed, ref } from 'vue';

interface DropDownProps {
  options: { value: string | number; data: T }[];
  tabindex?: number;
  color?: string;
  backgroundColor?: string;
  activeColor?: string;
  borderColor?: string;
}

const props = withDefaults(defineProps<DropDownProps>(), {
  tabindex: 0,
  color: 'white',
  backgroundColor: 'var(--dark-gray)',
  activeColor: 'var(--gray)',
  borderColor: 'var(--light-gray)',
});

//#region REFS
const isOpen = ref<boolean>(false);
const selected = defineModel<string | number | null>();
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
    color: v-bind(color);
    cursor: pointer;
    user-select: none;
    background-color: v-bind(backgroundColor);
    border: 1px solid v-bind(borderColor);
    border-radius: 6px;

    &.open {
      border-radius: 6px 6px 0 0;

      &:after {
        transform: rotateZ(180deg) translateY(10px) translateX(5px);
      }
    }

    &:after {
      position: absolute;
      top: 22px;
      right: 10px;
      width: 0;
      height: 0;
      content: '';
      border: 7px solid transparent;
      border-color: v-bind(color) transparent transparent transparent;
      transition: transform 0.5s;
      transform: translateY(0px) translateX(-5px);
    }
  }

  .fold-enter-active {
    animation: fold 0.5s reverse;
  }

  .fold-leave-active {
    animation: fold 0.5s;
  }

  .items {
    position: absolute;
    right: 0;
    left: 0;
    overflow: hidden;
    color: v-bind(color);
    background-color: v-bind(backgroundColor);
    border-right: 1px solid v-bind(borderColor);
    border-bottom: 1px solid v-bind(borderColor);
    border-left: 1px solid v-bind(borderColor);
    border-radius: 0 0 6px 6px;

    .item {
      padding-left: 15px;
      color: v-bind(color);
      cursor: pointer;
      user-select: none;
      transition: background-color 0.2s ease;

      &:hover {
        background-color: v-bind(activeColor);
      }
    }
  }
}

@keyframes fold {
  0% {
    max-height: 500px;
  }
  100% {
    max-height: 0;
  }
}
</style>
