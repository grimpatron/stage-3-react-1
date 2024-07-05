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

// interface baseParameters {
//   name: string;
// }

interface HeaderState {
  parameters: string;
  searchQuery: string;
}

class Header extends Component<object, HeaderState> {
  constructor(props: object) {
    super(props);
    this.state = {
      parameters: "",
      searchQuery: "",
    };
  }

  componentDidMount() {
    this.fetchCharacters();
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
        console.log({ characters: data.results });
      })
      .catch((error) => console.error("Error receiving data:", error));
  };

  handleSearch = async () => {
    const { searchQuery } = this.state;
    const searchResults = await searchInAllSections(searchQuery);
    this.setState({ parameters: searchResults });
    // this.fetchCharacters();
  };

  handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ searchQuery: event.target.value });
  };

  render() {
    return (
      <header className="top-bar">
        <h1 className="top-bar__title">Star Wars API</h1>
        <input type="text" name="" id="" onChange={this.handleInputChange} />
        <button onClick={this.handleSearch}>Search</button>
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
    } catch (error) {
      console.error(`Error fetching data from ${sectionName}:`, error);
    }
  }
  console.log("No results found in any section.");
  return [];
};
