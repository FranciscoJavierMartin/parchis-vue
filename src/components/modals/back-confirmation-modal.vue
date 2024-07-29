<template>
  <BaseModal>
    <div class="confirm-modal">
      <BaseIcon type="info" />
      <h2 class="title">Exit</h2>
      <span class="text">Are you sure you want to quit the game?</span>
      <div class="buttons-container">
        <button class="button-yes" @click="$emit('confirmation')">
          <div>
            <BaseIcon type="check" />
            <span>Yes</span>
          </div>
        </button>
        <button class="button-no" @click="$emit('cancel')">
          <div>
            <BaseIcon type="close" />
            <span>No</span>
          </div>
        </button>
      </div>
    </div>
  </BaseModal>
</template>

<script setup lang="ts">
import BaseModal from '@/components/base/base-modal.vue';
import BaseIcon from '@/components/icons/base-icon.vue';

defineEmits(['cancel', 'confirmation']);
</script>

<style scoped>
.confirm-modal {
  display: flex;
  flex-direction: column;
  gap: 15px;
  align-items: center;
  width: 100%;
  padding: 20px;
  color: white;
  background: radial-gradient(circle, rgba(160, 34, 107, 1) 16%, rgba(95, 8, 98, 1) 100%);
  border-radius: 5px;
  box-shadow:
    black 0px 0px 0px 3px,
    #be835d 0px 0px 0px 6px,
    rgb(255, 217, 19) 0px 0px 0px 9px;
  animation: scaleUp 0.5s;

  .icon-wrapper {
    width: 20%;
  }

  .title,
  .text {
    text-align: center;
  }

  .buttons-container {
    display: flex;
    justify-content: space-evenly;
    width: 100%;

    .button-no {
      background-color: var(--game-red);
    }

    .button-yes {
      background-color: var(--game-blue);

      > div {
        .icon-wrapper {
          width: 16px;
          height: 16px;
        }
      }
    }

    .button-yes,
    .button-no {
      display: flex;
      gap: 10px;
      align-items: center;
      justify-content: center;
      max-width: 100px;
      padding: 10px 20px;
      font-size: 18px;
      color: white;
      cursor: pointer;
      border: none;
      border-radius: 5px;

      &:hover {
        filter: brightness(150%);
      }

      /* stylelint-disable-next-line no-descending-specificity */
      > div {
        display: flex;
        gap: 5px;
        align-items: center;
        justify-content: center;

        .icon-wrapper {
          width: 20px;
          height: 20px;
        }
      }
    }
  }
}
</style>
