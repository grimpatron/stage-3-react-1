import { useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import Header from '../header/Header.tsx';
import Main from '../main/Main.tsx';
import NotFound from '../notfound/NotFound.tsx';
import ErrorBoundary from '../errorboundary/ErrorBoundary.tsx';
import { useTheme } from '../../context/ThemeContext.tsx';

interface ItemInterface {
  name: string;
}

function App() {
  const {theme} = useTheme();
  const [parameters, setParameters] = useState<string[]>([]);
  const updateSearchResults = (searchResults: string[]) => {
    setParameters(searchResults);
  };

  const handleCurrentPageChange = (newPage: number) => {
    history.pushState(null, '', `/search/${newPage}`);
    console.log('Current page received in parent:', newPage);
  };

  return (
    <div className={`app ${theme}`}>
      <ErrorBoundary>
          <Header updateSearchResults={updateSearchResults}/>
          <BrowserRouter>
            <Routes>
              <Route
                path='/'
                element={
                  <Main searchResults={parameters as unknown as ItemInterface[]} onPageChange={handleCurrentPageChange} />
                }
              />
              <Route
                path='/search/:page'
                element={
                  <Main searchResults={parameters as unknown as ItemInterface[]} onPageChange={handleCurrentPageChange} />
                }
              />
              <Route path='*' element={<NotFound />} />
            </Routes>
          </BrowserRouter>
      </ErrorBoundary>
    </div>
  );
}

export default App;
