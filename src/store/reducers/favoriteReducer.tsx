const ADD_TO_FAVORITE = 'ADD_TO_FAVORITE';
const REMOVE_FROM_FAVORITE = 'REMOVE_FROM_FAVORITE';

export interface FavoriteState {
  favorites: object[];
}

interface AddToFavoriteAction {
  type: typeof ADD_TO_FAVORITE;
  payload: object;
}

interface RemoveFromFavoriteAction {
  type: typeof REMOVE_FROM_FAVORITE;
  payload: object;
}

export type FavoriteActionTypes = AddToFavoriteAction | RemoveFromFavoriteAction;

const initialState: FavoriteState = {
  favorites: []
};

const favoriteReducer = (state = initialState, action: FavoriteActionTypes): FavoriteState => {
  switch (action.type) {
    case ADD_TO_FAVORITE:
      return {
        ...state,
        favorites: [...state.favorites, action.payload]
      };

    case REMOVE_FROM_FAVORITE:
      return {
        ...state,
        favorites: state.favorites.filter(favorite => favorite !== action.payload)
      };

    default:
      return state;
  }
};

export default favoriteReducer;
