import { useState, useEffect, SetStateAction } from 'react';
import Loader from '../Loader/Loader';
import './Header.css';
import ThemeSwitcher from '../ThemeSwitcher/ThemeSwitcher';
import { useTheme } from '../../context/ThemeContext';
import useLocalStorage from '../../hooks/useLocalStorage';
import useSearch from '../../hooks/useSearch';

interface HeaderProps {
  updateSearchResults: (results: string[]) => void;
}

const Header = ({ updateSearchResults }: HeaderProps) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [lastSearchValue, setLastSearchValue] = useLocalStorage('last-search');
  const [hasError, setHasError] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const { isLoading, searchAllSections } = useSearch(updateSearchResults);

  const searchClick = () => {
    const trimmedQuery = searchQuery.trim();
    setLastSearchValue(trimmedQuery);
    searchAllSections(trimmedQuery);
  };

  const handleInputChange = (event: { target: { value: SetStateAction<string> } }) => {
    setSearchQuery(event.target.value);
  };

  const getSearch = () => {
    const inputEl = document.querySelector('#input') as HTMLInputElement;

    if (lastSearchValue != null) {
      setSearchQuery(lastSearchValue);
      inputEl.value = lastSearchValue;
      searchAllSections(lastSearchValue);
    }
  };

  useEffect(() => {
    getSearch();
  }, []);

  const handleBreak = () => {
    setHasError(true);
  };

  useEffect(() => {
    if (hasError) {
      throw new Error('Error handle!');
    }
  }, [hasError]);

  return (
    <header className={`top-bar  ${theme === 'light' ? 'light-theme' : 'dark-theme'}`}>
      <h1 className='top-bar__title'>Star Wars API</h1>
      <input type='text' name='search-input' id='input' onChange={handleInputChange} />
      <button onClick={searchClick}>Search</button>
      <button onClick={handleBreak}>💀</button>
      <ThemeSwitcher theme={theme} toggleTheme={toggleTheme} />
      {isLoading && <Loader />}
    </header>
  );
};

export default Header;
