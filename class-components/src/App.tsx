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

  render() {
    return (
      <>
        <ErrorBoundary>
          <Header updateSearchResults={this.updateSearchResults} />
          <Main searchResults={this.state.parameters as ItemInterface[]} />
        </ErrorBoundary>
      </>
    );
  }
}

export default App;

class ErrorBoundary extends Component<
  { children?: React.ReactNode },
  { hasError: boolean }
> {
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
