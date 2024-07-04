import { Component } from "react";

interface Character {
  name: string;
  height: string;
  mass: string;
}

interface HeaderState {
  characters: Character[];
}

class Header extends Component<object, HeaderState> {
  constructor(props: object) {
    super(props);
    this.state = {
      characters: [],
    };
  }

  componentDidMount() {
    this.fetchCharacters();
  }

  fetchCharacters = () => {
    fetch("https://swapi.dev/api/people")
      .then((response) => response.json())
      .then((data) => {
        this.setState({ characters: data.results });
        console.log({ characters: data.results });
      })
      .catch((error) => console.error("Ошибка при получении данных:", error));
  };

  render() {
    return (
      <div>
        <input type="text" name="" id="" />
        <button onClick={this.fetchCharacters}>Search</button>
        {/* {this.state.characters.map((character) => (
          <div key={character.name}>
            Имя: {character.name}, Рост: {character.height} см, Вес: {character.mass} кг
          </div>
        ))} */}
      </div>
    );
  }
}

export default Header;
