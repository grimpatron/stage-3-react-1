import { render, screen } from '@testing-library/react';
import { useSelector } from 'react-redux';
import useTheme from '../../context/useTheme';
import Favorite from './Favorite';

jest.mock('react-redux', () => ({
  useSelector: jest.fn(),
}));

jest.mock('../../context/ThemeContext', () => ({
  useTheme: jest.fn(),
}));

describe('Favorite', () => {
  beforeEach(() => {
    (useSelector as unknown as jest.Mock).mockReturnValue({
      favorites: [{ name: 'Luke Skywalker' }],
    });
    (useTheme as jest.Mock).mockReturnValue({ theme: 'light' });
  });

  test('renders Favorite component', () => {
    render(<Favorite />);
    expect(screen.getByText('Favorite List')).toBeInTheDocument();
  });

  test('applies light theme class', () => {
    render(<Favorite />);
    expect(screen.getByText('Favorite List').parentElement).toHaveClass('light-theme');
  });

  test('renders favorite characters', () => {
    render(<Favorite />);
    expect(screen.getByText('Luke Skywalker')).toBeInTheDocument();
  });
});
