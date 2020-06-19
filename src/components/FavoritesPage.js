import React, { useState } from 'react';
import { FavoritesContext } from '../context/FavoritesContext';
import FavoritesList from './FavoritesList';
import FavoritesForm from './FavoritesForm';
import SuggestionForm from './SuggestionForm';
import SearchResults from './SearchResults';

import { data } from '../data';

const FavoritesPage = () => {
  const [favorites, setFavorites] = useState([]);
  const [results, setResults] = useState(data);

  return (
    <FavoritesContext.Provider value={{ favorites, setFavorites, results }}>
      <FavoritesList />
      <FavoritesForm />
      <SuggestionForm />
      <SearchResults />
    </FavoritesContext.Provider>
  );
};

export default FavoritesPage;
