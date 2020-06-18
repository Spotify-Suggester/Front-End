import React from 'react';
import FavoritesList from './FavoritesList';
import FavoritesForm from './FavoritesForm';
import SuggestionForm from './SuggestionForm';

const Favorites = () => {
  return (
    <>
      <FavoritesList />
      <FavoritesForm />
      <SuggestionForm />
    </>
  );
};

export default Favorites;
