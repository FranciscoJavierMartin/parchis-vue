<template>
  <div class="game-board-wrapper"><slot /></div>
</template>

<style scoped>
.game-board-wrapper {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  width: 100%;
}
</style>
