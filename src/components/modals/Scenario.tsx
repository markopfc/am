import React, { useEffect, useRef, useCallback } from 'react';
import { createPortal } from 'react-dom';

interface ScenarioProps {
  onClose?: () => void;
  isOpen: boolean;
  title?: string;
  children?: React.ReactNode;
  dataTestId?: string;
}

const Scenario: React.FC<ScenarioProps> = ({
  onClose,
  isOpen,
  title = 'Modal Title',
  children,
  dataTestId,
}) => {
  const modalRef = useRef<HTMLDivElement | null>(null);
  const firstFocusableElementRef = useRef<HTMLButtonElement | null>(null);

  // Handle focus trap within the modal
  // Handle Tab, Shift+Tab to move focus to the next and previous element within the active modal
  // What if we have a modal within a modal, handle active focus on the inner modal

  // If modal is last in the stack, and user completes the flow, close all previous modals
  // Keep track of the previously focused element to restore focus on close

  // Some possible additional features to add to the modal component:
  // - Handle multiple modals making them compatible with a context hook
  // - Styling the modal with a custom class name based on modal type, props, etc.
  //

  useEffect(() => {
    if (isOpen) {
      // Add event listener on mount
      document.addEventListener('keydown', handleKeyDown);
      // Set focus on the modal with a slight delay ensuring the modal is rendered
      setTimeout(() => firstFocusableElementRef.current?.focus(), 10);
    }
    // Remove event listener on unmount
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [isOpen]);

  // Handle ESC key to close modal
  const handleKeyDown = useCallback(
    (event: KeyboardEvent) => {
      // Close modal on ESC key
      if (event.key === 'Escape' && onClose) {
        onClose();
      } else if (event.key === 'Tab') {
        // Trap focus inside modal
        const focusableElements = modalRef.current?.querySelectorAll(
          'button, a, input, select, textarea, [tabindex]:not([tabindex="-1"])'
        ) as NodeListOf<HTMLElement> | undefined;

        if (focusableElements && focusableElements.length > 0) {
          const firstElement = focusableElements[0];
          const lastElement = focusableElements[focusableElements.length - 1];

          if (event.shiftKey && document.activeElement === firstElement) {
            lastElement.focus();
            event.preventDefault();
          } else if (
            !event.shiftKey &&
            document.activeElement === lastElement
          ) {
            firstElement.focus();
            event.preventDefault();
          }
        }
      }
    },
    [onClose]
  );

  // Handle closing modal when clicking outside
  const handleOutsideClick = useCallback(
    (event: React.MouseEvent) => {
      // Close modal only if the click is outside the modal
      if (event.target === event.currentTarget) {
        onClose?.();
      }
    },
    [onClose]
  );

  // Close modal on close button click
  // useCallback to prevent multiple event calls
  const handleCloseButton = useCallback(
    (event: React.MouseEvent) => {
      // Prevent multiple event calls
      event.stopPropagation();
      onClose?.();
    },
    [onClose]
  );

  // Return null if modal is not open
  if (!isOpen) return null;

  return createPortal(
    <div
      ref={modalRef}
      data-testid={dataTestId}
      className='fixed inset-0 flex items-center justify-center bg-black bg-opacity-50'
      onClick={handleOutsideClick}
    >
      <div
        role='dialog'
        aria-modal='true'
        className='bg-white p-6 rounded-lg shadow-lg w-96'
      >
        <header className='flex justify-between items-center'>
          <h2 role='heading' className='text-lg font-semibold text-gray-700'>
            {title}
          </h2>
          <button
            ref={firstFocusableElementRef}
            aria-label='close'
            onClick={handleCloseButton}
            className='bg-white p-2 text-gray-600 hover:text-black z-40'
          >
            x
          </button>
        </header>
        <div className='mt-4 text-gray-600'>{children}</div>
      </div>
    </div>,
    document.body
  );
};

export default Scenario;
