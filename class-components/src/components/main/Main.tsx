import { Component } from 'react';
import './Main.css';

class Main extends Component {
  render() {
    const planetInfoTest = {
      name: 'Yavin IV',
      rotation_period: '24',
      orbital_period: '4818',
      diameter: '10200',
      climate: 'temperate, tropical',
      gravity: '1 standard',
      terrain: 'jungle, rainforests',
      surface_water: '8',
      population: '1000',
    };

    return (
      <main className='main'>
        <ul className='list'>
          {Object.entries(planetInfoTest).map(([key, value]) => (
            <li key={key}>
              {key}: {value}
            </li>
          ))}
        </ul>
      </main>
    );
  }
}

export default Main;
