import React, { Component } from 'react';
import './Header.css';

const apiSections: string[] = ['people', 'planets', 'films', 'species', 'vehicles', 'starships'];

interface HeaderStateInterface {
  searchResults: string;
  searchQuery: string;
  hasError: boolean;
}

interface PropsInterface {
  updateSearchResults: (results: object[]) => void;
}

class Header extends Component<PropsInterface, HeaderStateInterface> {
  constructor(props: PropsInterface) {
    super(props);
    this.state = {
      searchResults: '',
      searchQuery: '',
      hasError: false,
    };
  }

  componentDidMount() {
    this.loadLastSearch();
  }

  fetchData = async (apiUrl: string) => {
    try {
      const response = await fetch(apiUrl);
      const data = await response.json();
      return data.results;
    } catch (error) {
      console.error('Error receiving data:', error);
      return [];
    }
  };

  searchAllSections = () => {
    const { searchQuery } = this.state;
    const trimmedQuery = searchQuery.trim();

    const fetchPromises = apiSections.map(sectionName => {
      const apiUrl = `https://swapi.dev/api/${sectionName}/?search=${encodeURIComponent(trimmedQuery)}`;
      return this.fetchData(apiUrl);
    });

    Promise.all(fetchPromises)
      .then(results => {
        const combinedResults = results.flat();
        this.props.updateSearchResults(combinedResults);
        this.setState({ searchResults: JSON.stringify(combinedResults) });
        this.saveLastSearch(trimmedQuery);
      })
      .catch(error => console.error('Error fetching characters:', error));
  };

  handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    this.setState({ searchQuery: event.target.value });
  };

  saveLastSearch(query: string) {
    localStorage.setItem('last-search', query);
  }

  loadLastSearch() {
    const inputEl = document.querySelector('#input') as HTMLInputElement;
    const lastSearch = localStorage.getItem('last-search');
    if (lastSearch !== null) {
      inputEl.value = lastSearch;
      this.setState({ searchQuery: lastSearch }, this.searchAllSections);
    } else {
      this.searchAllSections();
    }
  }

  handleBreak = () => {
    this.setState({ hasError: true });
  };

  componentDidUpdate() {
    if (this.state.hasError) {
      throw new Error('Error handle!');
    }
  }

  render() {
    return (
      <header className='top-bar'>
        <h1 className='top-bar__title'>Star Wars API</h1>
        <input type='text' name='search-input' id='input' onChange={this.handleInputChange} />
        <button onClick={this.searchAllSections}>Search</button>
        <button onClick={this.handleBreak}>💀</button>
      </header>
    );
  }
}

export default Header;
