<template>
  <div class="game-over-ribbon">
    <div class="ribbon-content">
      <p>
        <b>{{ title }}</b>
      </p>
    </div>
  </div>
</template>

<script setup lang="ts">
interface GameOverRibbonProps {
  title?: string;
}

withDefaults(defineProps<GameOverRibbonProps>(), { title: '' });
</script>

<style scoped>
.game-over-ribbon {
  position: relative;
  width: 100%;
  font-family: 'Helvetica Neue', Helvetica, sans-serif;
  font-size: 16px !important;
  text-align: center;
  background: #ca201e;
  box-shadow: rgba(0, 0, 0, 0.3) 0 0 0;

  &:before,
  &:after {
    position: absolute;
    bottom: -1em;
    z-index: -1;
    display: block;
    content: '';
  }

  &:before {
    left: -2em;
    border: 1.5em solid #e12320;
    border-right-width: 1.5em;
    border-left-color: transparent;
  }

  &:after {
    right: -2em;
    border: 1.5em solid #e12320;
    border-right-color: transparent;
    border-left-width: 1.5em;
  }

  .ribbon-content {
    text-transform: uppercase;

    &:before,
    &:after {
      position: absolute;
      bottom: -1em;
      display: block;
      content: '';
      border-color: #5d0f0e transparent transparent transparent;
      border-style: solid;
    }

    &:before {
      left: 0;
      border-width: 1em 0 0 1em;
    }

    &:after {
      right: 0;
      border-width: 1em 1em 0 0;
    }

    p {
      padding: 15px 10px;
      margin: 0px;
      font-size: 25px !important;
      color: #ffffff;
      text-shadow: white 1px 1px 0;
    }
  }
}
</style>
