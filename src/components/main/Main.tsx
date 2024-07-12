import './Main.css';

interface ItemInterface {
  name: string;
}

interface PropsInterface {
  searchResults: ItemInterface[];
}

function Main({ searchResults }: PropsInterface) {
  const checkValue = (value: string | []) => {
    if (Array.isArray(value)) {
      const listItems = value.map((item, index) => <li key={index}>{item}</li>);
      return <ol className='result-list--nested'>{listItems}</ol>;
    }
    return value;
  };

  return (
    <main className='main'>
      {searchResults.map((character: ItemInterface, index) => (
        <div className='result-block' key={index}>
          <h3 className='result-title'>{character.name}</h3>

          <ul className='result-list'>
            {Object.entries(character).map(([key, value]) => (
              <li key={key}>
                <strong>{key}:</strong> {checkValue(value)}
              </li>
            ))}
          </ul>
        </div>
      ))}
    </main>
  );
}

export default Main;
