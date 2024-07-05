import { Component } from "react";
import "./App.css";
import Header from "./components/header/Header.tsx";
import Main from "./components/main/Main.tsx";

interface PropsInterface {}
interface StateInterface {
  parameters: Array<object>;
}

class App extends Component<PropsInterface, StateInterface> {
  constructor(props: PropsInterface) {
    super(props);
    this.state = {
      parameters: [],
    };
  }

  updateSearchResults = (searchResults: Array<object>) => {
    this.setState({ parameters: searchResults });
  };

  render() {
    return (
      <>
        <Header updateSearchResults={this.updateSearchResults} />
        <Main searchResults={this.state.parameters} />
      </>
    );
  }
}

export default App;
