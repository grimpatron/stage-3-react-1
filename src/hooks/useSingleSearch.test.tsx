import { render, act } from '@testing-library/react';
import useSingleSearch from './useSingleSearch';
import fetchMock from 'jest-fetch-mock';

fetchMock.enableMocks();

beforeEach(() => {
  fetchMock.resetMocks();
});

interface TestComponentProps {
  selectedResultIndex: number | null;
}

const TestComponent: React.FC<TestComponentProps> = ({ selectedResultIndex }) => {
  const { selectedResult, isLoading, hasError } = useSingleSearch(selectedResultIndex);
  return (
    <div>
      {isLoading && <p>Loading...</p>}
      {hasError && <p>Error occurred</p>}
      {selectedResult && <p>{selectedResult.name}</p>}
    </div>
  );
};

test('should return initial state', () => {
  const { container } = render(<TestComponent selectedResultIndex={null} />);
  expect(container.textContent).toBe('');
});

test('should fetch data and update state', async () => {
  const mockData = { name: 'Luke Skywalker' };
  fetchMock.mockResponseOnce(JSON.stringify(mockData));

  let container: HTMLElement | undefined;
  await act(async () => {
    const { container: renderedContainer } = render(<TestComponent selectedResultIndex={0} />);
    container = renderedContainer;
  });

  expect(container!.textContent).toContain('Luke Skywalker');
});

test('should handle fetch error', async () => {
  fetchMock.mockReject(new Error('Failed to fetch'));

  let container: HTMLElement | undefined;
  await act(async () => {
    const { container: renderedContainer } = render(<TestComponent selectedResultIndex={0} />);
    container = renderedContainer;
  });

  expect(container!.textContent).toContain('Error occurred');
});
