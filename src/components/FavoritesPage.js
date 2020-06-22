import React, { useState } from 'react';
import { FavoritesContext } from '../context/FavoritesContext';
import FavoritesList from './FavoritesList';
import SearchForm from './SearchForm';
import SuggestionForm from './SuggestionForm';
import SearchResults from './SearchResults';
import ListComponent from './ListComponent';
import RadarChart from './RadarChart'

import { data } from '../data';
import GenreListSearch from './GenreListSearch';

const FavoritesPage = () => {
  const [favorites, setFavorites] = useState([]);
  const [results, setResults] = useState(data);

  return (
    <FavoritesContext.Provider value={{ favorites, setFavorites, results }}>
      <FavoritesList />
      <SearchForm />
      <ListComponent />
      <SuggestionForm />
      <GenreListSearch />
      <RadarChart />
    </FavoritesContext.Provider>
  );
};

export default FavoritesPage;
