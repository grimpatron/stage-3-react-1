import { useState, useEffect, SetStateAction } from 'react';
import Loader from '../Loader/Loader';
import './Header.css';
import ThemeSwitcher from '../ThemeSwitcher/ThemeSwitcher';
import { useTheme } from '../../context/ThemeContext';
import useLocalStorage from '../../hooks/useLocalStorage';
import useSearch from '../../hooks/useSearch';
import { NavLink } from 'react-router-dom';
import { useSelector } from 'react-redux';

interface HeaderProps {
  updateSearchResults: (results: string[]) => void;
}

interface RootState {
  favoriteReducer: {
    length: number;
    favorites: object[];
  };
}
const Header = ({ updateSearchResults }: HeaderProps) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [lastSearchValue, setLastSearchValue] = useLocalStorage('last-search');
  const [hasError, setHasError] = useState(false);
  const { theme, toggleTheme } = useTheme();
  const { isLoading, searchAllSections } = useSearch(updateSearchResults);
  const storeData = useSelector((state: RootState) => state.favoriteReducer);
  const [favoriteCnt, setFavoriteCnt] = useState(0);

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

  useEffect(() => {
    const length = storeData.favorites.length;
    setFavoriteCnt(length);
  }, [storeData, storeData.favorites]);

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
      <NavLink to='/' className='top-bar__title'>
        Star Wars API
      </NavLink>
      <input type='text' name='search-input' id='input' onChange={handleInputChange} />
      <button onClick={searchClick}>🔍 search</button>
      <button onClick={handleBreak}>💀</button>
      <NavLink to='/favorite' className='top-bar__favorite'>
        ⭐️<span className='favorite-counter'>{favoriteCnt}</span>
      </NavLink>
      <ThemeSwitcher theme={theme} toggleTheme={toggleTheme} />
      {isLoading && <Loader />}
    </header>
  );
};

export default Header;
