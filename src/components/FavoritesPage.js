import React from 'react';
import { FavoritesContext } from '../context/FavoritesContext';
import FavoritesList from './FavoritesList';
import SearchForm from './SearchForm';
import SuggestionForm from './SuggestionForm';
import GenreListSearch from './GenreListSearch'

const FavoritesPage = () => {
  return (
    <FavoritesContext.Provider>
      <FavoritesList />
      <SearchForm />
      <SuggestionForm />
      <GenreListSearch />
    </FavoritesContext.Provider>
  );
};

export default FavoritesPage;
