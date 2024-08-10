<template>
  <PageWrapper>
    <template #leftOption>
      <BackButton />
    </template>
    <template #rightOption>
      <MenuOptions />
    </template>
    <template #default>
      <div class="about-page">
        <GameLogo />
        <p>
          The origins of
          <a
            title="Ludo"
            href="https://en.wikipedia.org/wiki/Parch%C3%ADs"
            target="_blank"
            rel="noopener noreferrer"
          >
            Parchis
          </a>
          can be traced back to ancient India, where it was known as "Pachisi." Initially played by
          royalty, it soon became popular among people from all walks of life. As it spread to other
          regions, including England and the United States, it underwent various transformations and
          adaptations, eventually evolving into the beloved game we know today as Parchis.
        </p>
        <p>
          Parchis Vue is a game developed using
          <a title="Vue.JS" href="https://vuejs.org/" target="_blank" rel="noopener noreferrer">
            Vue.js
          </a>
          and
          <a
            title="TypeScript"
            href="https://www.typescriptlang.org/"
            target="_blank"
            rel="noopener noreferrer"
          >
            TypeScript </a
          >, this digital adaptation stays true to the essence of the original game while offering a
          fresh and engaging experience for modern players.
        </p>
      </div>
    </template>
  </PageWrapper>
</template>

<script setup lang="ts">
import GameLogo from '@common/components/game-logo/game-logo.vue';
import MenuOptions from '@layouts/components/menu-options/menu-options.vue';
import BackButton from '@layouts/components/back-button/back-button/back-button.vue';
import PageWrapper from '@layouts/components/wrapper/page-wrapper/page-wrapper.vue';
</script>

<style scoped>
.about-page {
  width: 80%;
  padding: 0 25px;
  margin-top: 40px;
  background-color: rgb(0 37 78 / 60%);
  border-radius: 10px;
  box-shadow:
    rgba(0, 0, 0, 0.4) 0px 2px 4px,
    rgba(0, 0, 0, 0.3) 0px 7px 13px -3px,
    rgba(0, 0, 0, 0.2) 0px -3px 0px inset;
  animation: fadeInLeft 500ms ease both;

  p {
    margin: 25px 0;
    font-size: 16px;
    color: white;
    text-align: justify;
  }

  a,
  a:visited {
    font-weight: bold;
    color: white;
    text-decoration: none;
  }
}
</style>
