import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { Provider } from 'react-redux';
import configureStore, { MockStoreEnhanced } from 'redux-mock-store';
import InfoCardFull from './InfoCardFull';
import useTheme from '../../context/useTheme';
import { Store, UnknownAction } from 'redux';
import { store } from '../../store/store';

jest.mock('../../context/useTheme', () => ({
  __esModule: true,
  default: jest.fn(),
}));

const mockStore = configureStore([]);

describe('InfoCardFull', () => {
  let store: MockStoreEnhanced<unknown> | Store<unknown, UnknownAction, unknown>;

  beforeEach(() => {
    store = mockStore({
      favoriteReducer: {
        favorites: [{ name: 'Character 1' }],
      },
    });

    (useTheme as jest.Mock).mockReturnValue({ theme: 'light' });
  });

  test('renders InfoCardFull component', () => {
    render(
      <Provider store={store}>
        <InfoCardFull
          character={{ name: 'Character 1' }}
          index={0}
          setSelectedResultIndex={jest.fn()}
        />
      </Provider>
    );

    // expect(screen.getByText('Character 1')).toBeTruthy(); 
    expect(screen.getByRole('checkbox')).toBeTruthy();
  });
});

test('checkbox changes state on click', () => {
  const mockDispatch = jest.fn();
  store.dispatch = mockDispatch;

  render(
    <Provider store={store}>
      <InfoCardFull
        character={{ name: 'Character 1' }}
        index={0}
        setSelectedResultIndex={jest.fn()}
      />
    </Provider>
  );

  const checkbox = screen.getByRole('checkbox');
  fireEvent.click(checkbox);

  // expect(mockDispatch).toHaveBeenCalledWith(expect.any(Function));
  expect(mockDispatch).toHaveBeenCalledWith({
    type: 'ADD_TO_FAVORITE',
    payload: { name: 'Character 1' },
  });
  
});
