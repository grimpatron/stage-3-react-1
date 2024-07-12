import { Component, useState } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import './App.css';
import Header from '../header/Header.tsx';
import Main from '../main/Main.tsx';
import Entity from '../main/Entity.tsx';
import NotFound from '../notfound/NotFound.tsx';

interface ItemInterface {
  name: string;
}

function App() {
  const [parameters, setParameters] = useState<string[]>([]);
  const updateSearchResults = (searchResults: string[]) => {
    setParameters(searchResults);
  };

  return (
    <>
      <ErrorBoundary>
        <Header updateSearchResults={updateSearchResults} />
        <BrowserRouter>
        <Routes>
          <Route path='/' element={<Main searchResults={parameters as unknown as ItemInterface[]} />} />
          <Route path='/search/:page' element={<Entity/>} />
          <Route path='*' element={<NotFound/>} />
        </Routes>
        </BrowserRouter>
      </ErrorBoundary>
    </>
  );
}

export default App;

class ErrorBoundary extends Component<{ children?: React.ReactNode }, { hasError: boolean }> {
  constructor(props: { children?: React.ReactNode }) {
    super(props);
    this.state = {
      hasError: false,
    };
  }

  static getDerivedStateFromError() {
    return { hasError: true };
  }

  componentDidCatch(error: object, errorInfo: object) {
    console.error('Error caught:', error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return (
        <>
          <h2>💀 💀 💀</h2>
          <h3>You've just broken the application.</h3>
          <h2>💀 💀 💀</h2>
        </>
      );
    }

    return this.props.children;
  }
}
