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
// interface PropsInterface {
//   searchResults: Array<object>;
// }

interface HeaderState {
  parameters: string;
  searchQuery: string;
}
interface PropsInterface {
  updateSearchResults: (results: object[]) => void;
}

class Header extends Component<PropsInterface, HeaderState> {
  constructor(props: PropsInterface) {
    super(props);
    this.state = {
      parameters: "",
      searchQuery: "",
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
        // console.log({ characters: data.results });
      })
      .catch((error) => console.error("Error receiving data:", error));
  };

  handleSearch = async () => {
    // Тут будет добавление в локалку.
    const { searchQuery } = this.state;
    const searchResults = await searchInAllSections(searchQuery);
    // отправляем в MAIN
    this.props.updateSearchResults(searchResults);
    this.setState({ parameters: searchResults }); // получается уже не  надо
    // this.fetchCharacters();
    this.saveLastRequire(searchQuery)
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

  render() {
    return (
      <header className="top-bar">
        <h1 className="top-bar__title">Star Wars API</h1>
        <input type="text" name="" id="input" onChange={this.handleInputChange} />
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
  console.log("No results.");
  return [];
};

// посмотреть что там с жизненным циклом.
//  загрузка из локалки
// function loadLastRequire() {
//   const inputEl = document.querySelector('#input') as HTMLInputElement;
//   const lastRequire = localStorage.getItem('last-require');
//   if (lastRequire !== null) {
//     inputEl.value = lastRequire;
//   }
// }

// function saveLastRequire(query: string) {
//   localStorage.setItem('last-require', query)
// }