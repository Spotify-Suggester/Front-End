import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { UserContext } from '../contexts/UserContext';
import { FavoritesContext } from '../contexts/FavoritesContext';
import FavoritesList from './FavoritesList';
import SearchForm from './SearchForm';
import SuggestionForm from './SuggestionForm';
import SearchResults from './SearchResults';
import ListComponent from './ListComponent';
import RadarChart from './RadarChart';

import {
  axiosWithUserAuth,
  axiosWithSpotifyAuth
} from '../utils/axiosWithAuth';
import { data } from '../data';
import GenreListSearch from './GenreListSearch';

// api call will be something similar to this
// const dynamicData = axiosWithSpotifyAuth()
//   .get('https://api.spotify.com/v1/search?q=tania%20bowra&type=artist')
//   .then((res) => console.log(res.data))
//   .catch((err) => console.log(err.message));

const FavoritesPage = () => {
  const [favorites, setFavorites] = useState([]);
  const [results, setResults] = useState(data);
  const { userId, setUserId } = useContext(UserContext);

  useEffect(() => {
    console.log('userId', userId);
    axiosWithUserAuth()
      .get(
        `https://spotify-suggester1.herokuapp.com/api/users/${userId}/favorites`
      )
      .then((response) => console.log('response', response))
      .catch((err) => console.error('err', err.response));
  }, []);

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
