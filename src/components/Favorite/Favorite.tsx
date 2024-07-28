import { useTheme } from "../../context/ThemeContext";
import { useSelector } from "react-redux";
import "./Favorite.css";
// import { useState } from "react";
import InfoCardFull from "../InfoCard/InfoCardFull";

interface RootState {
  favoriteReducer: {
    favorites: ItemInterface[];
  };
}
interface ItemInterface {
  name: string;
  [key: string]: string;
}


function Favorite() {
  const storeData = useSelector((state: RootState) => state.favoriteReducer);
  // const [favCard, setFavCard] = useState([]);
  
  console.log(storeData, ' - storeData', storeData.favorites);
  
  const { theme } = useTheme();

  return (
    <div className={`favorite  ${theme === 'light' ? 'light-theme' : 'dark-theme'}`}>
      <h3>Favorite List</h3>

      {storeData.favorites.map((character: ItemInterface, index: number) => (
        <InfoCardFull character={character} index={index} setSelectedResultIndex={ () => void {} }/>
      ))}

    </div>
  )
}

export default Favorite;
