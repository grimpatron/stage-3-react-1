export const addToFavorite = (character: { name: string; [key: string]: string }) => ({
  type: 'ADD_TO_FAVORITE',
  payload: character,
});

export const removeFromFavorite = (character: { name: string; [key: string]: string }) => ({
  type: 'REMOVE_FROM_FAVORITE',
  payload: character,
});
