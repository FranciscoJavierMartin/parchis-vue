<template>
  <Teleport to="#toast-container">
    <div class="toast-container">
      <div class="toast-wrapper">
        <span>
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Voluptates, nemo repudiandae
          beatae recusandae non repellendus, sapiente vitae facilis aliquid nesciunt aperiam
          consequuntur consectetur? Repellat mollitia dolor natus illum magni dolores?</span
        >
      </div>
    </div>
  </Teleport>
</template>

<script setup lang="ts"></script>

<style scoped>
.toast-container {
  position: absolute;
  bottom: 50px;
  width: 100%;

  .toast-wrapper {
    width: max-content;
    padding: 10px 15px;
    margin: auto;
    color: white;
    background-color: black;
    border-radius: 16px;
  }
}
</style>
