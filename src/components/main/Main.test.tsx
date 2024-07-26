import '@testing-library/jest-dom';
import { render, screen, fireEvent } from '@testing-library/react';
import Main from './Main';
import { ThemeContextProvider } from '../../context/ThemeContext';

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
const mockOnPageChange = jest.fn();

describe('Main Component', () => {
  // test('renders without crashing', () => {
  //   render(
  //     <ThemeContextProvider>
  //       <Main searchResults={mockSearchResults} onPageChange={mockOnPageChange} />
  //     </ThemeContextProvider>
  //   );
  //   expect(screen.getByText('Item 1')).toBeInTheDocument();
  // });

  test('calls onPageChange with current page', () => {
    render(
      <ThemeContextProvider>
        <Main searchResults={mockSearchResults} onPageChange={mockOnPageChange} />
      </ThemeContextProvider>
    );
    expect(mockOnPageChange).toHaveBeenCalledWith(1);
  });

  test('displays correct number of items per page', () => {
    render(
      <ThemeContextProvider>
        <Main searchResults={mockSearchResults} onPageChange={mockOnPageChange} />
      </ThemeContextProvider>
    );
    expect(screen.getAllByText(/Item/).length).toBe(20);
  });

  test('navigates to next page', () => {
    render(
      <ThemeContextProvider>
        <Main searchResults={mockSearchResults} onPageChange={mockOnPageChange} />
      </ThemeContextProvider>
    );
    fireEvent.click(screen.getByText('next'));
    expect(screen.getAllByText('Item 11').length).toBe(2);
  });

  // test('navigates to previous page', () => {
  //   render(
  //     <ThemeContextProvider>
  //       <Main searchResults={mockSearchResults} onPageChange={mockOnPageChange} />
  //     </ThemeContextProvider>
  //   );
  //   fireEvent.click(screen.getByText('next'));
  //   fireEvent.click(screen.getByText('previous'));
  //   expect(screen.getByText('Item 1')).toBeInTheDocument();
  // });

  // test('displays selected result details', () => {
  //   render(
  //     <ThemeContextProvider>
  //       <Main searchResults={mockSearchResults} onPageChange={mockOnPageChange} />
  //     </ThemeContextProvider>
  //   );
  //   fireEvent.click(screen.getByText('Item 1'));
  //   expect(screen.getAllByText('Item 1').length).toBeGreaterThan(0);
  // });
});

// test('renders Main component with empty search results', () => {
//   const mockOnPageChange = jest.fn();
//   render(
//     <ThemeContextProvider>
//       <Main searchResults={[]} onPageChange={mockOnPageChange} />
//     </ThemeContextProvider>
//   );

//   expect(screen.getByText(/0 \/ 1/i)).toBeInTheDocument();
// });

// const mockSearchResults = Array.from({ length: 20 }, (_, i) => ({ name: `Item ${i + 1}` }));

test('pagination works correctly', () => {
  const mockOnPageChange = jest.fn();
  render(
    <ThemeContextProvider>
      <Main searchResults={mockSearchResults} onPageChange={mockOnPageChange} />
    </ThemeContextProvider>
  );

  // Проверка начальной страницы
  expect(screen.getByText(/1 \/ 2/i)).toBeInTheDocument();

  // Переход на следующую страницу
  fireEvent.click(screen.getByText(/next/i));
  expect(screen.getByText(/2 \/ 2/i)).toBeInTheDocument();
  expect(mockOnPageChange).toHaveBeenCalledWith(2);

  // Переход на предыдущую страницу
  fireEvent.click(screen.getByText(/previous/i));
  expect(screen.getByText(/1 \/ 2/i)).toBeInTheDocument();
  expect(mockOnPageChange).toHaveBeenCalledWith(1);
});
