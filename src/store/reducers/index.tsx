import { combineReducers, Reducer } from 'redux';
import favoriteReducer, { FavoriteState, FavoriteActionTypes } from './favoriteReducer';

const rootReducer = combineReducers({
  favoriteReducer: favoriteReducer,
});

export default rootReducer as unknown as Reducer<{ favoriteReducer: FavoriteState }, FavoriteActionTypes>;
