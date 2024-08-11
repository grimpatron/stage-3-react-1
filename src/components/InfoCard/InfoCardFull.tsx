import useTheme from '../../context/useTheme';
import InfoCardList from './InfoCardList';
import { useDispatch, useSelector } from 'react-redux';
import { addToFavorite, removeFromFavorite } from '../../store/actions';

interface RootState {
  favoriteReducer: {
    favorites: { name: string; [key: string]: string }[];
  };
}

interface InfoCardFullProps {
  character: { name: string; [key: string]: string };
  index: number;
  setSelectedResultIndex: (index: number | null) => void;
}

const InfoCardFull: React.FC<InfoCardFullProps> = ({ character, index, setSelectedResultIndex }) => {
  const { theme } = useTheme();
  const dispatch = useDispatch();
  const storeData = useSelector((state: RootState) => state.favoriteReducer);

  const clickFavorite = (
    event: React.ChangeEvent<HTMLInputElement>,
    character: { name: string; [key: string]: string }
  ) => {
    if (event.target.checked) {
      dispatch(addToFavorite(character));
    } else {
      dispatch(removeFromFavorite(character));
    }
  };

  return (
    <div
      className={`result-block ${theme}`}
      key={index}
      onClick={e => {
        if ((e.target as HTMLElement).tagName !== 'INPUT') {
          setSelectedResultIndex(index);
        }
      }}
    >
      <div className='result-top-bar'>
        <h3 className='result-title'>{character.name}</h3>
        <input
          className='result-checkbox'
          type='checkbox'
          name={character.name}
          onChange={e => clickFavorite(e, character)}
          checked={character.name ? storeData?.favorites?.some(fav => fav.name === character.name) : false}
        />
      </div>
      <InfoCardList character={character} />
    </div>
  );
};

export default InfoCardFull;
