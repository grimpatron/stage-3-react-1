import { Component } from "react";
import "./App.css";
import Header from "./components/header/Header.tsx";
import Main from "./components/main/Main.tsx";

interface PropsInterface {}
interface StateInterface {
  parameters: Array<object>;
  hasError: boolean;
}
interface ItemInterface {
  name: string;
}
class App extends Component<PropsInterface, StateInterface> {
  constructor(props: PropsInterface) {
    super(props);
    this.state = {
      parameters: [],
      hasError: false,
    };
  }

  updateSearchResults = (searchResults: Array<object>) => {
    this.setState({ parameters: searchResults });
  };

  handleBreak = () => {
    // throw new Error("Тестовая ошибка!");
  };

  render() {
    return (
      <>
        <ErrorBoundary>
          <Header updateSearchResults={this.updateSearchResults} handleBreak={this.handleBreak} />
          <Main searchResults={this.state.parameters as ItemInterface[]} />
        </ErrorBoundary>
      </>
    );
  }
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
    console.error("Error caught:", error, errorInfo);
  }

  render() {
    if (this.state.hasError) {
      return <h1>Congratulations, you've broken the application.</h1>;
    }

    return this.props.children || null;
  }
}


