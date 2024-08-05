import { render, screen } from '@testing-library/react';
import useSingleSearch from '../../hooks/useSingleSearch';
import Main from './Main';

jest.mock('../../hooks/useSingleSearch');

const mockUseSingleSearch = useSingleSearch as jest.MockedFunction<typeof useSingleSearch>;


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
    expect(screen.getByRole('main')).not.toBeNull();
  });

  test('renders loading message', () => {
    mockUseSingleSearch.mockReturnValue({
      selectedResult: null,
      isLoading: true,
      hasError: false,
    });
    render(<Main searchResults={[]} onPageChange={() => {}} />);
    expect(screen.getByText('Loading...')).not.toBeNull();
  });

  test('renders error message', () => {
    mockUseSingleSearch.mockReturnValue({
      selectedResult: null,
      isLoading: false,
      hasError: true,
    });
    render(<Main searchResults={[]} onPageChange={() => {}} />);
    expect(screen.getByText('Error loading data.')).not.toBeNull();
  });
});
