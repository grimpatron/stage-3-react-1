import favoriteReducer from './reducers/favoriteReducer';
import { configureStore } from '@reduxjs/toolkit';

export const store = configureStore({
  reducer: {
    favorite: favoriteReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
