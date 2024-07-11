import { Component, useState } from 'react';
import './App.css';
import Header from '../header/Header.tsx';
import Main from '../main/Main.tsx';

interface ItemInterface {
  name: string;
}

function App() {
  const [parameters, setParameters] = useState<Array<object>>([]);
  const updateSearchResults = (searchResults: Array<object>) => {
    setParameters(searchResults);
  };

  return (
    <>
      <ErrorBoundary>
        <Header updateSearchResults={updateSearchResults} />
        <Main searchResults={parameters as ItemInterface[]} />
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
