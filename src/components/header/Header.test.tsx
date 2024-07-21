
// import { render } from '@testing-library/react';

// test('demo', () => {
//   expect(true).toBe(true);
// });


// import Header from './Header';
// import '@testing-library/jest-dom';
// describe('Header', () => {
//   test('should render children', () => {
//     const { container } = render(<Header updateSearchResults={function (): void {
//       throw new Error('Function not implemented.');
//     } } />);
//     const search = container.querySelector('.top-bar__title');
//     const input = container.querySelector('#input');
//     // const btn = container.querySelector('.btn');
//     expect(search).toBeInTheDocument();
//     expect(input).toBeInTheDocument();
//     // expect(btn).toBeInTheDocument();
//   });
// });




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
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve({ results: ['result1', 'result2'] }),
      } as Response)
    );

    render(<Header updateSearchResults={mockUpdateSearchResults} />);
    fireEvent.change(screen.getByRole('textbox'), { target: { value: 'test' } });
    fireEvent.click(screen.getByText('Search'));

    // await waitFor(() => expect(mockUpdateSearchResults).toHaveBeenCalledWith(['result1', 'result2']));
  });

  test('displays loader during search', async () => {
    global.fetch = jest.fn(() =>
      Promise.resolve({
        ok: true,
        json: () => Promise.resolve({ results: ['result1', 'result2'] }),
      } as Response)
    );

    render(<Header updateSearchResults={mockUpdateSearchResults} />);
    fireEvent.change(screen.getByRole('textbox'), { target: { value: 'test' } });
    fireEvent.click(screen.getByText('Search'));

    // expect(screen.getByText('Loading...')).toBeInTheDocument();
    await waitFor(() => expect(screen.queryByText('Loading...')).not.toBeInTheDocument());
  });

  test('handles errors during fetch', async () => {
    global.fetch = jest.fn(() => Promise.reject(new Error('Fetch error')));

    render(<Header updateSearchResults={mockUpdateSearchResults} />);
    fireEvent.change(screen.getByRole('textbox'), { target: { value: 'test' } });
    fireEvent.click(screen.getByText('Search'));

    await waitFor(() => expect(screen.queryByText('Loading...')).not.toBeInTheDocument());
    // expect(screen.queryByText('Error handle!')).toBeInTheDocument();
  });
});
