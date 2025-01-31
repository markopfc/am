import { fireEvent, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Scenario from './Scenario';
import { beforeEach, describe, expect, test, vi } from 'vitest';
import { renderWithUser } from '../../utils/user';

describe('Modal', () => {
  const mockClose = vi.fn();

  // beforeAll(() => {
  //   mockClose.mockReset();
  // });

  // Changed to beforeEach to reset the mock before each test case runs
  // because the mockClose function is called in each test case
  // and we want to ensure that the mock is reset before each test case
  // Using BeforeAll would not work in this case because the mockClose function
  // is called in each test which would result in each concurent adding to the mockClose call count

  beforeEach(() => {
    mockClose.mockReset();
  });

  test('renders modal with expected controls', () => {
    // Added isOpen prop to the Scenario component so that the modal is open by default
    render(<Scenario isOpen={true} />);
    expect(screen.getByRole('dialog')).toBeInTheDocument();
    expect(screen.getByRole('heading')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /close/i })).toBeInTheDocument();
  });

  describe('when passed onClose handler', () => {
    test('calls onClose action when pressing the ESC key', () => {
      // Added isOpen prop to the Scenario component so that the modal is open by default
      render(<Scenario isOpen={true} onClose={mockClose} />);
      fireEvent.keyDown(screen.getByRole('dialog'), {
        key: 'Escape',
        code: 'Escape',
      });
      expect(mockClose).toHaveBeenCalledTimes(1);
    });

    test('renders dismissible button that calls onClose action when clicked', async () => {
      // Created a missing renderWithUser function to render the Scenario component
      // with the user object to simulate user interactions

      // Added isOpen prop to the Scenario component so that the modal is open by default
      const { user } = renderWithUser(
        <Scenario isOpen={true} onClose={mockClose} />
      );
      const closeButton = screen.getByRole('button', { name: /close/i });
      await user.click(closeButton);

      expect(mockClose).toHaveBeenCalledTimes(1);
    });

    test('calls onClick action when clicking outside of the modal', async () => {
      // Created a missing renderWithUser function to render the Scenario component
      // with the user object to simulate user interactions

      // Added isOpen prop to the Scenario component so that the modal is open by default

      // Changed data-testid prop to dataTestId to match the prop name in the Scenario component
      const { user } = renderWithUser(
        <Scenario isOpen={true} dataTestId='mockId' onClose={mockClose} />
      );
      const scrimElement = screen.getByTestId('mockId');
      await user.click(scrimElement);

      expect(mockClose).toHaveBeenCalledTimes(1);
    });
  });
});
