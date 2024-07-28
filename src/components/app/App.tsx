import { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Header from '../Header/Header.tsx';
import Main from '../Main/Main.tsx';
import Favorite from '../Favorite/Favorite.tsx';
import NotFound from '../Notfound/NotFound.tsx';
import ErrorBoundary from '../Errorboundary/ErrorBoundary.tsx';
import { useTheme } from '../../context/ThemeContext.tsx';
import './App.css';

interface ItemInterface {
  [key: string]: string;
}

function App() {
  const { theme } = useTheme();
  const [parameters, setParameters] = useState<string[]>([]);
  const updateSearchResults = (searchResults: string[]) => {
    setParameters(searchResults);
  };

  const handleCurrentPageChange = (newPage: number) => {
    history.pushState(null, '', `/search/${newPage}`);
  };

  return (
    <div className={`app ${theme}`}>
      <ErrorBoundary>
        <BrowserRouter>
          <Header updateSearchResults={updateSearchResults} />
          <Routes>
            <Route
              path='/'
              element={
                <Main searchResults={parameters as unknown as ItemInterface[]} onPageChange={handleCurrentPageChange} />
              }
            />
            <Route
              path='/search/:id'
              element={
                <Main searchResults={parameters as unknown as ItemInterface[]} onPageChange={handleCurrentPageChange} />
              }
            />
            <Route path='/favorite' element={<Favorite />} />
            <Route path='*' element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </ErrorBoundary>
    </div>
  );
}

export default App;
