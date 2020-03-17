import React from 'react';
import { render } from '@testing-library/react';
import App from './App';

test('renders User Script Form', () => {
  const { getByTestId } = render(<App />);
  const UserScriptForm = getByTestId('user-script-form');
  expect(UserScriptForm).toBeInTheDocument();
});
