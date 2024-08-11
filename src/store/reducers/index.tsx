import { combineReducers, Reducer } from 'redux';
import favoriteReducer, { FavoriteState, FavoriteActionTypes } from './favoriteReducer';

const rootReducer = combineReducers({
  favorite: favoriteReducer,
});

export default rootReducer as unknown as Reducer<{ favorite: FavoriteState }, FavoriteActionTypes>;
