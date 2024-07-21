import { useState, useEffect, SetStateAction } from 'react';
import fetch from 'node-fetch';
import Loader from '../loader/Loader';
import './Header.css';

const apiSections = ['people', 'planets', 'films', 'species', 'vehicles', 'starships'];
interface HeaderProps {
  updateSearchResults: (results: string[]) => void;
}

interface ApiResponse {
  results: string[];
}

function useLocalStorage(key: string) {
  const [value, setValue] = useState<string | null>(localStorage.getItem(key));

  const setStoredValue = (newValue: string) => {
    localStorage.setItem(key, newValue);
    setValue(newValue);
  };

  return [value, setStoredValue] as const;
}

const Header = ({ updateSearchResults }: HeaderProps) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);
  const [lastSearchValue, setLastSearchValue] = useLocalStorage('last-search');

  const fetchData = async (apiUrl: string): Promise<string[]> => {
    try {
      const response = await fetch(apiUrl);
      const data = await response.json() as ApiResponse;
      return data.results;
    } catch (error) {
      console.error('Error receiving data:', error);
      setHasError(true);
      return [];
    }
  };

  const searchClick = () => {
    searchAllSections();
    const trimmedQuery = searchQuery.trim();
    setLastSearchValue(trimmedQuery);
  };

  const searchAllSections = () => {
    const inputEl = document.querySelector('#input') as HTMLInputElement;
    const trimmedQuery = inputEl.value.trim();
    const fetchPromises = apiSections.map(sectionName => {
      const apiUrl = `https://swapi.dev/api/${sectionName}/?search=${encodeURIComponent(trimmedQuery)}`;
      return fetchData(apiUrl);
    });

    setIsLoading(true);

    Promise.all(fetchPromises)
      .then(results => {
        const combinedResults = results.flat();
        updateSearchResults(combinedResults);
      })
      .catch(error => {
        console.error('Error fetching characters:', error);
        setHasError(true);
      })
      .finally(() => {
        setIsLoading(false);
      });
  };

  const handleInputChange = (event: { target: { value: SetStateAction<string> } }) => {
    setSearchQuery(event.target.value);
  };

  const loadLastSearch = () => {
    const inputEl = document.querySelector('#input') as HTMLInputElement;

    if (lastSearchValue != null) {
      setSearchQuery(lastSearchValue);
      inputEl.value = lastSearchValue;
      searchAllSections();
    }
  };

  useEffect(() => {
    loadLastSearch();
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
    <header className='top-bar'>
      <h1 className='top-bar__title'>Star Wars API</h1>
      <input type='text' name='search-input' id='input' onChange={handleInputChange} />
      <button onClick={searchClick}>Search</button>
      <button onClick={handleBreak}>💀</button>
      {isLoading && <Loader />}
    </header>
  );
};

export default Header;
