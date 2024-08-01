import { customRef, type Ref } from 'vue';

const focusableElementsSelector: string =
  'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])';

export default function useFocusTrap(): {
  trapRef: Ref<HTMLElement>;
  initFocusTrap: () => void;
  clearFocusTrap: () => void;
} {
  let focusableElements: NodeListOf<HTMLElement>;
  let $firstFocusable: HTMLElement;
  let $lastFocusable: HTMLElement;

  const trapRef = customRef<HTMLElement>((track, trigger) => {
    let $trapEl: HTMLElement | null = null;

    return {
      get(): HTMLElement {
        track();
        return $trapEl as HTMLElement;
      },
      set(value: HTMLElement): void {
        $trapEl = value;

        // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
        if (value) {
          initFocusTrap();
        } else {
          clearFocusTrap();
        }

        trigger();
      },
    };
  });

  function keyHandler(event: KeyboardEvent): void {
    if (event.key === 'Tab') {
      if (event.shiftKey) {
        if (document.activeElement === $firstFocusable) {
          $lastFocusable.focus();
          event.preventDefault();
        }
      } else {
        if (document.activeElement === $lastFocusable) {
          $firstFocusable.focus();
          event.preventDefault();
        }
      }
    }
  }

  function initFocusTrap(): void {
    // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
    if (trapRef.value) {
      focusableElements = trapRef.value.querySelectorAll(focusableElementsSelector);
      $firstFocusable = focusableElements.item(0);
      $lastFocusable = focusableElements.item(focusableElements.length - 1);

      document.addEventListener('keydown', keyHandler);
      $firstFocusable.focus();
    }
  }

  function clearFocusTrap(): void {
    document.removeEventListener('keydown', keyHandler);
  }

  return {
    trapRef,
    initFocusTrap,
    clearFocusTrap,
  };
}
