import React from 'react';
import { FavoritesContext } from '../context/FavoritesContext';
import FavoritesList from './FavoritesList';
import FavoritesForm from './FavoritesForm';
import SuggestionForm from './SuggestionForm';

const FavoritesPage = () => {
  return (
    <FavoritesContext.Provider>
      <FavoritesList />
      <FavoritesForm />
      <SuggestionForm />
    </FavoritesContext.Provider>
  );
};

export default FavoritesPage;
