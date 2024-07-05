import { Component } from "react";
import "./Main.css";

interface ItemInterface {
  name: string;
}

interface PropsInterface {
  searchResults: ItemInterface[];
}

class Main extends Component<PropsInterface> {
  checkValue(value: string | []) {
    if (Array.isArray(value)) {
      const listItems = value.map((item, index) => <li key={index}>{item}</li>);
      return <ul>{listItems}</ul>;
    }
    return value;
  }

  render() {
    const { searchResults } = this.props;

    return (
      <main className="main">
        {searchResults.map((character: ItemInterface) => (
          <div className="result-block" key={character.name}>
            <h3 className="result-title">Name: {character.name}</h3>

            <ul className="result-list">
              {Object.entries(character).map(([key, value]) => (
                <li>
                  <strong>{key}:</strong> {this.checkValue(value)}
                </li>
              ))}
            </ul>
          </div>
        ))}
      </main>
    );
  }
}

export default Main;
