import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { UserContext } from '../contexts/UserContext';
import { FavoritesContext } from '../contexts/FavoritesContext';
import FavoritesList from './FavoritesList';
import SearchForm from './SearchForm';
import SuggestionForm from './SuggestionForm';
import NavigationBar from './NavigationBar';
import ListComponent from './ListComponent';
import RadarChart from './RadarChart';
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';

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
const useStyles = makeStyles(() => ({
  container: {
    display: 'flex',
    margin: '0',
    padding: '0',
    paddingTop: '64px'
  },
  emptyContainer: {
    width: '450px',
    minWidth: '450px',
    margin: '0'
  }
}));

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
  const classes = useStyles();

  return (
    <FavoritesContext.Provider value={{ favorites, setFavorites, results }}>
      <Container className={classes.container} maxWidth='full'>
        <NavigationBar />
        <FavoritesList />
        <Container className={classes.emptyContainer} />
        <Container>
          <SearchForm />
          <ListComponent />
          <SuggestionForm />
          <RadarChart />
          <GenreListSearch />
          <RadarChart />
        </Container>
      </Container>
    </FavoritesContext.Provider>
  );
};

export default FavoritesPage;
