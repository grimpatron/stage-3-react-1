import { useState } from 'react';
import './Main.css';
import { useTheme } from '../../context/ThemeContext';

interface ItemInterface {
  name: string;
}

interface PropsInterface {
  searchResults: ItemInterface[];
  onPageChange: (currentPage: number) => void;
}

function Main({ searchResults, onPageChange }: PropsInterface) {
  const {theme} = useTheme();
  const [itemsPerPage] = useState(10);
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedResultIndex, setSelectedResultIndex] = useState<number | null>(null);
  onPageChange(currentPage);

  const checkValue = (value: string | []) => {
    if (Array.isArray(value)) {
      const listItems = value.map((item, index) => <li key={index}>{item}</li>);
      return <ol className='result-list--nested'>{listItems}</ol>;
    }
    return value;
  };

  const startIndex = (currentPage - 1) * itemsPerPage;
  const visibleResults = searchResults.slice(startIndex, startIndex + itemsPerPage);
  return (
    <main className='main'>
      <div className='result'>
        <div className='result-answer'>
          {visibleResults.map((character: ItemInterface, index) => (
            <div className={`result-block ${theme}`} key={index} onClick={() => setSelectedResultIndex(index)}>
              <h3 className='result-title'>{character.name}</h3>
              <ul className='result-list'>
                {Object.entries(character).map(([key, value]) => (
                  <li key={key}>
                    <strong>{key}:</strong> {checkValue(value)}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
        <div className='result-full'>
          {selectedResultIndex !== null && (
            <div className='result-block'>
              <h3 className='result-title'>{searchResults[selectedResultIndex].name}</h3>
              <ul className='result-list'>
                {Object.entries(searchResults[selectedResultIndex]).map(([key, value]) => (
                  <li key={key}>
                    <strong>{key}:</strong> {checkValue(value)}
                  </li>
                ))}
              </ul>
            </div>
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
