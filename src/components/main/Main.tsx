import { useState } from 'react';
import './Main.css';
// import { useTheme } from '../../context/ThemeContext';
import useSingleSearch from '../../hooks/useSingleSearch';
// import InfoCard from '../InfoCard/InfoCard';
import InfoCardFull from '../InfoCard/InfoCardFull';

interface ItemInterface {
  name: string;
  [key: string]: string;
}

interface PropsInterface {
  searchResults: ItemInterface[];
  onPageChange: (currentPage: number) => void;
}

function Main({ searchResults, onPageChange }: PropsInterface) {
  // const { theme } = useTheme();
  const [itemsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedResultIndex, setSelectedResultIndex] = useState<number | null>(null);
  const { selectedResult, isLoading, hasError } = useSingleSearch(selectedResultIndex);

  onPageChange(currentPage);

  const startIndex = (currentPage - 1) * itemsPerPage;
  const visibleResults = searchResults.slice(startIndex, startIndex + itemsPerPage);

  return (
    <main className='main'>
      <div className='result'>
        <div className='result-answer'>
          {visibleResults.map((character: ItemInterface, index) => (
            <InfoCardFull character={character} index={index} setSelectedResultIndex={setSelectedResultIndex} key={index} />
          ))}
        </div>

        <div className='result-full'>
          {isLoading ? (
            <p>Loading...</p>
          ) : hasError ? (
            <p>Error loading data.</p>
          ) : selectedResult && 'name' in selectedResult ? (
            <InfoCardFull character={selectedResult as ItemInterface} index={0} setSelectedResultIndex={setSelectedResultIndex} />
          ) : (
            <></>
          )}
        </div>
      </div>
      {searchResults.length >= itemsPerPage && (
        <div className='pagination'>
          <button onClick={() => setCurrentPage(currentPage - 1)} disabled={currentPage === 1}>
            previous
          </button>
          <span className='pagination-page'>
            {currentPage} / {Math.ceil(searchResults.length / itemsPerPage)}
          </span>
          <button
            onClick={() => setCurrentPage(currentPage + 1)}
            disabled={startIndex + itemsPerPage >= searchResults.length}
          >
            next
          </button>
        </div>
      )}
    </main>
  );
}

export default Main;
