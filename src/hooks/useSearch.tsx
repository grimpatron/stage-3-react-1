import { useState } from 'react';

const apiSections = ['people', 'planets', 'films', 'species', 'vehicles', 'starships'];

interface ApiResponse {
  results: string[];
}

const useSearch = (updateSearchResults: (results: string[]) => void) => {
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);

  const fetchData = async (apiUrl: string): Promise<string[]> => {
    try {
      const response = await fetch(apiUrl);
      const data = (await response.json()) as ApiResponse;
      return data.results;
    } catch (error) {
      console.error('Error receiving data:', error);
      setHasError(true);
      return [];
    }
  };

  const searchAllSections = (query: string) => {
    const fetchPromises = apiSections.map(sectionName => {
      const apiUrl = `https://swapi.dev/api/${sectionName}/?search=${encodeURIComponent(query)}`;
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

  return { isLoading, hasError, searchAllSections };
};

export default useSearch;
