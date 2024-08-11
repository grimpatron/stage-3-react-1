'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { ItemInterface } from '../../types';
import Header from '../../components/Header/Header';
import Main from '../../components/Main/Main';
import useTheme from '../../context/useTheme';
import './../../index.css';
import ErrorBoundary from '../../components/Errorboundary/ErrorBoundary';
import useSearch from '../../hooks/useSearch';
import Loader from '../../components/Loader/Loader';
import { fetchData } from '../../utils/network';

fetchData('https://swapi.dev/api/people')

interface RootLayoutProps {
  initialSearchResults: string[];
}

const RootLayout: React.FC<RootLayoutProps> = ({ initialSearchResults }) => {
  const { theme } = useTheme();
  const [parameters, setParameters] = useState<string[]>(initialSearchResults);
  const router = useRouter();

  const { isLoading, hasError, searchAllSections } = useSearch(setParameters);

  useEffect(() => {
    const searchQuery = localStorage.getItem('last-search') || '';
    searchAllSections(searchQuery);
  }, []);

  const updateSearchResults = (searchResults: string[]) => {
    setParameters(searchResults);
  };

  const handleCurrentPageChange = (newPage: number) => {
    router.push(`/search/${newPage}`);
  };

  return (
    <div className={`app ${theme}`}>
      <ErrorBoundary>
        {isLoading && <Loader />}
        {hasError && <p>Error fetching data</p>}
        <Header updateSearchResults={updateSearchResults} />
        <Main searchResults={parameters as unknown as ItemInterface[]} onPageChange={handleCurrentPageChange} />
      </ErrorBoundary>
    </div>
  );
};

export default RootLayout;
