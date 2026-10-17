import { useEffect, useRef } from "react";

export function useDialogFocus(isOpen, onClose) {
  const dialogRef = useRef(null);

  useEffect(() => {
    if (!isOpen) return;

    const dialog = dialogRef.current;
    if (!dialog) return;

    const previousFocus = document.activeElement;

    const getFocusableElements = () =>
      Array.from(
        dialog.querySelectorAll(
          'button:not([disabled]), [href], input:not([disabled]), select:not([disabled]), textarea:not([disabled]), [tabindex]:not([tabindex="-1"])',
        ),
      );

    const focusableElements = getFocusableElements();
    focusableElements[0]?.focus();

    const handleKeyDown = (event) => {
      if (event.key === "Escape") {
        event.preventDefault();
        onClose();
        return;
      }

      if (event.key !== "Tab") return;

      const elements = getFocusableElements();

      if (!elements.length) {
        event.preventDefault();
        return;
      }

      const first = elements[0];
      const last = elements[elements.length - 1];

      if (event.shiftKey) {
        if (
          document.activeElement === first ||
          !dialog.contains(document.activeElement)
        ) {
          event.preventDefault();
          last.focus();
        }
      } else if (
        document.activeElement === last ||
        !dialog.contains(document.activeElement)
      ) {
        event.preventDefault();
        first.focus();
      }
    };

    document.addEventListener("keydown", handleKeyDown);

    return () => {
      document.removeEventListener("keydown", handleKeyDown);

      if (previousFocus?.isConnected) {
        previousFocus.focus();
      }
    };
  }, [isOpen, onClose]);

  return dialogRef;
}
