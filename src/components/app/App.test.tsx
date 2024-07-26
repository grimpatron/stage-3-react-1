import '@testing-library/jest-dom';
import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';
import { ThemeContextProvider } from '../../context/ThemeContext';

jest.mock('../Header/Header.tsx', () => () => <div>Mocked Header</div>);
jest.mock('../Main/Main.tsx', () => () => <div>Mocked Main</div>);
jest.mock('../Notfound/NotFound.tsx', () => () => <div>Mocked NotFound</div>);
jest.mock('../Errorboundary/ErrorBoundary.tsx', () => ({ children }: { children: React.ReactNode }) => (
  <div>{children}</div>
));

describe('App Component', () => {
  test('renders without crashing', () => {
    render(
      <ThemeContextProvider>
        <App />
      </ThemeContextProvider>
    );
    expect(screen.getByText('Mocked Header')).toBeInTheDocument();
  });

  test('renders Main component on root path', () => {
    render(
      <ThemeContextProvider>
        <App />
      </ThemeContextProvider>
    );
    expect(screen.getByText('Mocked Main')).toBeInTheDocument();
  });

  test('renders NotFound component on unknown path', () => {
    window.history.pushState({}, 'Test page', '/unknown');
    render(
      <ThemeContextProvider>
        <App />
      </ThemeContextProvider>
    );
    expect(screen.getByText('Mocked NotFound')).toBeInTheDocument();
  });
});
