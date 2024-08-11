import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Определяем состояние
export interface FavoriteState {
  favorites: string[];
}

const initialState: FavoriteState = {
  favorites: [],
};

// Определяем типы действий
export type FavoriteActionTypes =
  | { type: 'ADD_TO_FAVORITE'; payload: string }
  | { type: 'REMOVE_FROM_FAVORITE'; payload: string };

// Создаем slice
const favoriteSlice = createSlice({
  name: 'favorite',
  initialState,
  reducers: {
    addToFavorite: (state, action: PayloadAction<string>) => {
      state.favorites.push(action.payload);
    },
    removeFromFavorite: (state, action: PayloadAction<string>) => {
      state.favorites = state.favorites.filter(favorite => favorite !== action.payload);
    },
  },
});

export const { addToFavorite, removeFromFavorite } = favoriteSlice.actions;
export default favoriteSlice.reducer;
