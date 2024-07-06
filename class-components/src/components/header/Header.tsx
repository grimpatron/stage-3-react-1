import React, { Component } from "react";
import "./Header.css";
const section: string[] = [
  "people",
  "planets",
  "films",
  "species",
  "vehicles",
  "starships",
];

interface HeaderState {
  parameters: string;
  searchQuery: string;
  hasError: boolean;
}
interface PropsInterface {
  updateSearchResults: (results: object[]) => void;
  handleBreak: (results: object[]) => void;
}

class Header extends Component<PropsInterface, HeaderState> {
  constructor(props: PropsInterface) {
    super(props);
    this.state = {
      parameters: "",
      searchQuery: "",
      hasError: false,
    };
  }

  componentDidMount() {
    this.fetchCharacters();
    this.loadLastRequire();
  }

  fetchCharacters = () => {
    const { searchQuery } = this.state;
    const apiUrl = searchQuery
      ? `https://swapi.dev/api/${section[0]}/?search=${encodeURIComponent(searchQuery)}`
      : `https://swapi.dev/api/${section[0]}`;

    fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => {
        this.setState({ parameters: data.results });
        this.props.updateSearchResults(data.results);
      })
      .catch((error) => console.error("Error receiving data:", error));
  };

  handleSearch = async () => {
    const { searchQuery } = this.state;
    const searchQueryTrim = searchQuery.trim();
    const searchResults = await searchInAllSections(searchQueryTrim);
    
    this.props.updateSearchResults(searchResults); // отправляем в MAIN
    this.setState({ parameters: searchResults });
    this.saveLastRequire(searchQueryTrim) // добавление в LS.
  };

  handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ searchQuery: event.target.value });
  };

  saveLastRequire(query: string) {
    localStorage.setItem('last-require', query)
  }

  loadLastRequire() {
    const inputEl = document.querySelector('#input') as HTMLInputElement;
    const lastRequire = localStorage.getItem('last-require');
    if (lastRequire !== null) {
      inputEl.value = lastRequire;
    }
  }

  handleBreak = () => {
    this.setState({ hasError: true });
  };
  componentDidUpdate() {
    if (this.state.hasError) {
      throw new Error("Ошибка!");
    }
  }
  

  render() {
    return (
      <header className="top-bar">
        <h1 className="top-bar__title">Star Wars API</h1>
        <input type="text" name="" id="input" onChange={this.handleInputChange} />
        <button onClick={this.handleSearch}>Search</button>
        <button onClick={this.handleBreak}>💀</button>
        {/* <button onClick={() => this.props.handleBreak([])}>💀</button> */}
      </header>
    );
  }
}

export default Header;

const searchInAllSections = async (searchQuery: string) => {
  for (const sectionName of section) {
    const apiUrl = `https://swapi.dev/api/${sectionName}/?search=${encodeURIComponent(searchQuery)}`;
    try {
      const response = await fetch(apiUrl);
      const data = await response.json();
      if (data.results.length > 0) {
        console.log(`Results in ${sectionName}:`, data.results);
        return data.results;
      }
    } catch (error) { console.error(`Error:`, error) }
  }
  console.log("No results.");
  return [];
};

