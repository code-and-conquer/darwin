import React from 'react';
import { render } from '@testing-library/react';
import App from './App';

test('renders Darwin text', () => {
  const { getByText } = render(<App />);
  const titleElement = getByText(/Darwin/i);
  expect(titleElement).toBeInTheDocument();
});
