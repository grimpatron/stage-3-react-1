import '@testing-library/jest-dom';
describe('Header Component', () => {
  beforeEach(() => {
    jest.clearAllMocks();
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
