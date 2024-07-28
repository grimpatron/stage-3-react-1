import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import Main from './Main';
import useSingleSearch from '../../hooks/useSingleSearch';

jest.mock('../../hooks/useSingleSearch');

const mockUseSingleSearch = useSingleSearch as jest.MockedFunction<typeof useSingleSearch>;

const mockSearchResults = [
  { name: 'Luke Skywalker', height: '172', mass: '77' },
  { name: 'Darth Vader', height: '202', mass: '136' },
];

describe('Main component', () => {
  beforeEach(() => {
    mockUseSingleSearch.mockReturnValue({
      selectedResult: null,
      isLoading: false,
      hasError: false,
    });
  });

  test('renders Main component with empty search results', () => {
    render(<Main searchResults={[]} onPageChange={() => {}} />);
    expect(screen.getByRole('main')).toBeInTheDocument();
  });

  test('renders Main component with search results', () => {
    render(<Main searchResults={mockSearchResults} onPageChange={() => {}} />);
    expect(screen.getByText('Luke Skywalker')).toBeInTheDocument();
    expect(screen.getByText('Darth Vader')).toBeInTheDocument();
  });

  test('renders loading message', () => {
    mockUseSingleSearch.mockReturnValue({
      selectedResult: null,
      isLoading: true,
      hasError: false,
    });
    render(<Main searchResults={[]} onPageChange={() => {}} />);
    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  test('renders error message', () => {
    mockUseSingleSearch.mockReturnValue({
      selectedResult: null,
      isLoading: false,
      hasError: true,
    });
    render(<Main searchResults={[]} onPageChange={() => {}} />);
    expect(screen.getByText('Error loading data.')).toBeInTheDocument();
  });

  test('renders selected result', () => {
    mockUseSingleSearch.mockReturnValue({
      selectedResult: mockSearchResults[0],
      isLoading: false,
      hasError: false,
    });
    render(<Main searchResults={mockSearchResults} onPageChange={() => {}} />);
    expect(screen.getByText('Luke Skywalker')).toBeInTheDocument();
  });
});
