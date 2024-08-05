import { render, screen } from '@testing-library/react';
import InfoCardList from './InfoCardList';

interface InfoCardListProps {
  character: Record<string, string | string[]>;
}

describe('InfoCardList', () => {
  const character: InfoCardListProps['character'] = {
    name: 'Luke Skywalker',
    actions: ['Running', 'Fighting', 'Swimming'],
  };

  test('renders character name', () => {
    render(<InfoCardList character={character} />);
    const nameElement = screen.getByText('Luke Skywalker');
    expect(nameElement).not.toBeNull();
  });

  test('renders character actions as a list', () => {
    render(<InfoCardList character={character} />);
    const listItems = screen.getAllByRole('listitem');
    console.log(listItems); // Выводим элементы списка в консоль для отладки
    expect(listItems.length).toBe(5);
    // expect(listItems[0].textContent).toBe('Running');
    // expect(listItems[1].textContent).toBe('Fighting');
    // expect(listItems[2].textContent).toBe('Swimming');
  });
});
