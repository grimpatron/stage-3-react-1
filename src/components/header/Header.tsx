import { useState, useEffect, SetStateAction } from 'react';
import './Header.css';
import Loader from '../loader/Loadet';

const apiSections = ['people', 'planets', 'films', 'species', 'vehicles', 'starships'];
interface HeaderProps {
  updateSearchResults: (results: string[]) => void;
}

const Header = ({ updateSearchResults }: HeaderProps) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);

  const fetchData = async (apiUrl: RequestInfo | URL) => {
    try {
      const response = await fetch(apiUrl);
      const data = await response.json();
      return data.results;
    } catch (error) {
      console.error('Error receiving data:', error);
      return [];
    }
  };

  const searchClick = () => {
    searchAllSections();
    const trimmedQuery = searchQuery.trim();
    saveLastSearch(trimmedQuery);
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
      .catch(error => console.error('Error fetching characters:', error))
      .finally(() => {
        setIsLoading(false);
      });
  };

  const handleInputChange = (event: { target: { value: SetStateAction<string> } }) => {
    setSearchQuery(event.target.value);
  };

  const saveLastSearch = (query: string) => {
    localStorage.setItem('last-search', query);
  };

  const loadLastSearch = () => {
    const inputEl = document.querySelector('#input') as HTMLInputElement;
    const last = localStorage.getItem('last-search');

    if (last != null) {
      setSearchQuery(last);
      inputEl.value = last;
      searchAllSections();
    } else {
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
