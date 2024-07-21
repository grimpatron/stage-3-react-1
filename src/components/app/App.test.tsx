import '@testing-library/jest-dom';
import { render, screen, waitFor } from '@testing-library/react';
import App from './App';

test('demo', () => {
  expect(true).toBe(true);
});

test('Renders the main page', async () => {
  render(<App />);
  await waitFor(() => {
    expect(screen.getByText(/Star Wars API/i)).toBeInTheDocument();
  });
});
