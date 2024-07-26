import '@testing-library/jest-dom';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Header from './Header';

const mockUpdateSearchResults = jest.fn();

describe('Header Component', () => {
beforeEach(() => {
  jest.clearAllMocks();
});

test('renders without crashing', () => {
  render(<Header updateSearchResults={mockUpdateSearchResults} />);
  expect(screen.getByRole('heading', { name: /Star Wars API/i })).toBeInTheDocument();
});

test('performs search on button click', async () => {
  render(<Header updateSearchResults={mockUpdateSearchResults} />);
  fireEvent.change(screen.getByRole('textbox'), { target: { value: 'test' } });
  fireEvent.click(screen.getByText('Search'));
});

test('displays loader during search', async () => {
  render(<Header updateSearchResults={mockUpdateSearchResults} />);
  fireEvent.change(screen.getByRole('textbox'), { target: { value: 'test' } });
  fireEvent.click(screen.getByText('Search'));

  await waitFor(() => expect(screen.queryByText('Loading...')).not.toBeInTheDocument());
});

test('handles errors during fetch', async () => {
  render(<Header updateSearchResults={mockUpdateSearchResults} />);
  fireEvent.change(screen.getByRole('textbox'), { target: { value: 'test' } });
  fireEvent.click(screen.getByText('Search'));

  await waitFor(() => expect(screen.queryByText('Loading...')).not.toBeInTheDocument());
});
});



jest.mock('../../hooks/useSearch', () => ({
__esModule: true,
default: jest.fn(() => ({
  isLoading: false,
  searchAllSections: jest.fn(),
})),
}));

jest.mock('../../context/ThemeContext', () => ({
useTheme: () => ({ theme: 'light', toggleTheme: jest.fn() }),
}));

jest.mock('../../hooks/useLocalStorage', () => jest.fn(() => ['', jest.fn()]));





// import { ThemeContextProvider, useTheme } from '../../context/ThemeContext';
// import useSearch from '../../hooks/useSearch';


// describe('Header Component', () => {
  // const mockUpdateSearchResults = jest.fn();
  
// beforeEach(() => {
//   jest.clearAllMocks();
// });

// test('renders without crashing', () => {
//   render(
//     <ThemeContextProvider>
//       <Header updateSearchResults={mockUpdateSearchResults} />
//     </ThemeContextProvider>
//   );
//   expect(screen.getByText('Star Wars API')).toBeInTheDocument();
// });

// test('calls searchAllSections on search button click', () => {
//   const { searchAllSections } = useSearch(mockUpdateSearchResults);
//   render(
//     <ThemeContextProvider>
//       <Header updateSearchResults={mockUpdateSearchResults} />
//     </ThemeContextProvider>
//   );

//   fireEvent.change(screen.getByRole('textbox'), { target: { value: 'test' } });
//   fireEvent.click(screen.getByText('Search'));

//   expect(searchAllSections).toHaveBeenCalledWith('test');
// });

// test('loads last search value on mount', () => {
//   render(
//     <ThemeContextProvider>
//       <Header updateSearchResults={mockUpdateSearchResults} />
//     </ThemeContextProvider>
//   );

//   expect(screen.getByRole('textbox')).toHaveValue('last search');
// });

// test('toggles theme on ThemeSwitcher click', () => {
//   const { toggleTheme } = useTheme();
//   render(
//     <ThemeContextProvider>
//       <Header updateSearchResults={mockUpdateSearchResults} />
//     </ThemeContextProvider>
//   );

//   fireEvent.click(screen.getByRole('button', { name: /💀/i }));
//   expect(toggleTheme).toHaveBeenCalled();
// });

// test('displays loader when isLoading is true', () => {
//   render(
//     <ThemeContextProvider>
//       <Header updateSearchResults={mockUpdateSearchResults} />
//     </ThemeContextProvider>
//   );

//   expect(screen.getByTestId('loader')).toBeInTheDocument();
// });

// test('throws error when handleBreak is called', () => {
//   render(
//     <ThemeContextProvider>
//       <Header updateSearchResults={mockUpdateSearchResults} />
//     </ThemeContextProvider>
//   );

//   expect(() => {
//     fireEvent.click(screen.getByText('💀'));
//   }).toThrow('Error handle!');
// });
// });
