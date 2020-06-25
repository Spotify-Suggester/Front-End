import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { UserContext } from '../contexts/UserContext';
import { FavoritesContext } from '../contexts/FavoritesContext';
import FavoritesList from './FavoritesList';
import SearchForm from './SearchForm';
import SuggestionList from './SuggestionList';
import NavigationBar from './NavigationBar';
import ListComponent from './ListComponent';

import SearchMood from './SearchMood';
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';

import {
  axiosWithUserAuth,
  axiosWithSpotifyAuth
} from '../utils/axiosWithAuth';
import { data } from '../data';
import GenreListSearch from './GenreListSearch';

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
  const [results, setResults] = useState([]);
  const [suggestions, setSuggestions] = useState([]);
  const { userId, setUserId } = useContext(UserContext);
  const [isShowing, setIsShowing] = useState('search');

  const classes = useStyles();

  useEffect(() => {
    console.log('userId', userId);
    axiosWithUserAuth()
      .get(
        `https://spotify-suggester1.herokuapp.com/api/users/${userId}/favorites`
      )
      .then((res) => setFavorites(res.data.favorite_songs))
      .catch((err) => console.error('err', err.response));
  }, []);

  const addFavorite = (song) => {
    if (!favorites.includes(song)) {
      setFavorites([...favorites, song]);
      axiosWithUserAuth()
        .post(
          `https://spotify-suggester1.herokuapp.com/api/users/${userId}/favorites`,
          { song_id: song.id }
        )
        .then((res) => console.log('post response', res))
        .catch((err) => console.error('post error', err.message));
    }
  };

  const removeFavorite = (song) => {
    setFavorites(favorites.filter((item) => item.id != song.id));
    axiosWithUserAuth()
      .delete(
        `https://spotify-suggester1.herokuapp.com/api/users/${userId}/favorites/${song.id}`
      )
      .then((res) => console.log('delete response', res))
      .catch((err) => console.error('delete error', err));
  };

  return (
    <FavoritesContext.Provider
      value={{
        favorites,
        setFavorites,
        results,
        setResults,
        suggestions,
        setSuggestions,
        addFavorite,
        removeFavorite
      }}
    >
      <Container className={classes.container} maxWidth='full'>
        <NavigationBar setIsShowing={setIsShowing} />
        <FavoritesList setIsShowing={setIsShowing} />
        <Container className={classes.emptyContainer} />
        <Container className={classes.mainContainer}>
          {isShowing === 'search' ? (
            <>
              <SearchForm />
              <ListComponent />
            </>
          ) : isShowing === 'mood' ? (
            <SearchMood />
          ) : (
            <SuggestionList />
          )}
          {/* 
          <GenreListSearch /> */}
        </Container>
      </Container>
    </FavoritesContext.Provider>
  );
};

export default FavoritesPage;
