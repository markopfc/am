import { render } from '@testing-library/react';
import userEvent from '@testing-library/user-event';

export function renderWithUser(ui: React.ReactElement, options = {}) {
  const user = userEvent.setup();
  const renderResult = render(ui, { ...options });

  return {
    user,
    ...renderResult,
    container: renderResult.container,
  };
}
