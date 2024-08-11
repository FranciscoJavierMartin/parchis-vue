import { customRef, type Ref } from 'vue';

const focusableElementsSelector: string =
  'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])';

export default function useFocusTrap(): {
  trapRef: Ref<HTMLElement>;
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

  /**
   * If last element is focused, then move to first.
   * If first element is focused, then move to last.
   * @param event Key pressed
   */
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

  /**
   * Set values for trap focus and event handler
   */
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

  /**
   * Remove event handler
   */
  function clearFocusTrap(): void {
    document.removeEventListener('keydown', keyHandler);
  }

  return {
    trapRef,
  };
}
