import { useState, useEffect } from 'react';
interface ItemInterface {
  [key: string]: string;
}
const useSingleSearch = (selectedResultIndex: number | null) => {
  const [selectedResult, setSelectedResult] = useState<ItemInterface | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [hasError, setHasError] = useState(false);

  useEffect(() => {
    if (selectedResultIndex !== null) {
      const fetchData = async () => {
        setIsLoading(true);
        setHasError(false);
        try {
          const response = await fetch(`https://swapi.dev/api/people/${selectedResultIndex + 1}/`);
          const data = await response.json();
          setSelectedResult(data);
        } catch (error) {
          setHasError(true);
        } finally {
          setIsLoading(false);
        }
      };

      fetchData();
    }
  }, [selectedResultIndex]);

  return { selectedResult, isLoading, hasError };
};

export default useSingleSearch;
