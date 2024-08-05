'use client';

import { useState, useEffect, SetStateAction } from 'react';
import Link from 'next/link';
import Loader from '../Loader/Loader';
import ThemeSwitcher from '../ThemeSwitcher/ThemeSwitcher';
import useLocalStorage from '../../hooks/useLocalStorage';
import useSearch from '../../hooks/useSearch';
import useTheme from '../../context/useTheme';
import { useSelector } from 'react-redux';
import './Header.css';

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

    if (lastSearchValue) {
      setSearchQuery(lastSearchValue);
      inputEl.value = lastSearchValue;
      searchAllSections(lastSearchValue);
    }
  };

  useEffect(() => {
    getSearch();
  }, []);

  useEffect(() => {
    const length = storeData?.favorites?.length || 0;
    setFavoriteCnt(length);
  }, [storeData]);

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
      <Link className='top-bar__title' href={'/'}>
        Star Wars API
      </Link>
      <input type='text' name='search-input' id='input' onChange={handleInputChange} />
      <button onClick={searchClick}>🔍 search</button>
      <button onClick={handleBreak}>💀</button>
      <Link className='top-bar__favorite' href={'/favorite'}>
        ⭐️<span className='favorite-counter'>{favoriteCnt}</span>
      </Link>
      <ThemeSwitcher theme={theme} toggleTheme={toggleTheme} />
      {isLoading && <Loader />}
    </header>
  );
};

export default Header;
