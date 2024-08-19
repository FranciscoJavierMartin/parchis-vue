<template>
  <BaseModal :show-modal="showModal">
    <div class="confirm-modal">
      <BaseIcon type="info" />
      <h2 class="title">{{ t('backModal.exit') }}</h2>
      <span class="text">{{ t('backModal.areYouSure') }}</span>
      <div class="buttons-container">
        <button class="button blue button-yes" @click="$emit('confirmation')">
          <!-- TODO: Increase stroke width -->
          <BaseIcon type="check" />
          <span>{{ t('backModal.yes') }}</span>
        </button>
        <button class="button red button-no" @click="$emit('cancel')">
          <BaseIcon type="close" />
          <span>{{ t('backModal.no') }}</span>
        </button>
      </div>
    </div>
  </BaseModal>
</template>

<script setup lang="ts">
import BaseModal from '@layouts/components/base-modal/base-modal.vue';
import BaseIcon from '@common/components/icons/base-icon.vue';
import { useI18n } from 'vue-i18n';

interface BackConfirmationModalProps {
  /** Show modal */
  showModal: boolean;
}

defineProps<BackConfirmationModalProps>();

defineEmits<{
  /** Press 'No' button */
  cancel: [];
  /** Press 'Yes' button */
  confirmation: [];
}>();

const { t } = useI18n();
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

  .icon-info {
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

    .button.blue {
      background-color: var(--game-blue);
    }

    .button.blue,
    .button.red {
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

      .icon-wrapper {
        width: 16px;
        height: 16px;
      }
    }
  }
}
</style>
