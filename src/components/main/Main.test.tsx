test('test', () => {
  const res = true;
  expect(res).toBeTruthy();
});

test('demo', () => {
  expect(true).toBe(true);
});

// import {render, screen} from '@testing-library/react';
// import '@testing-library/jest-dom';
// import Main from './Main';

// test('render', () => {
//   render(<Main searchResults={[]} onPageChange={() => {
//     throw new Error('Function not implemented.');
//   }} />);

//   const linkElement = screen.getByText(/learn react/i);
//   expect (linkElement).toBeInTheDocument();
// })

import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import Main from './Main';

const mockOnPageChange = jest.fn();

const mockSearchResults = [
  { name: 'Item 1' },
  { name: 'Item 2' },
  { name: 'Item 3' },
  { name: 'Item 4' },
  { name: 'Item 5' },
  { name: 'Item 6' },
  { name: 'Item 7' },
  { name: 'Item 8' },
  { name: 'Item 9' },
  { name: 'Item 10' },
  { name: 'Item 11' },
];

describe('Main Component', () => {
  test('renders without crashing', () => {
    render(<Main searchResults={mockSearchResults} onPageChange={mockOnPageChange} />);
    expect(screen.getByRole('main')).toBeInTheDocument();
  });

  // test('displays search results', () => {
  //   render(<Main searchResults={mockSearchResults} onPageChange={mockOnPageChange} />);
  //   expect(screen.getByText('Item 1')).toBeInTheDocument();
  //   expect(screen.getByText('Item 10')).toBeInTheDocument();
  // });

  test('changes page when next button is clicked', () => {
    render(<Main searchResults={mockSearchResults} onPageChange={mockOnPageChange} />);
    fireEvent.click(screen.getByText('next'));
    expect(mockOnPageChange).toHaveBeenCalledWith(2);
  });

  test('disables previous button on first page', () => {
    render(<Main searchResults={mockSearchResults} onPageChange={mockOnPageChange} />);
    expect(screen.getByText('previous')).toBeDisabled();
  });

  test('disables next button on last page', () => {
    render(<Main searchResults={mockSearchResults.slice(0, 10)} onPageChange={mockOnPageChange} />);
    expect(screen.getByText('next')).toBeDisabled();
  });
});
