import React, { useState, useEffect, useContext } from 'react';
import axios from 'axios';
import { UserContext } from '../contexts/UserContext';
import { FavoritesContext } from '../contexts/FavoritesContext';
import FavoritesList from './FavoritesList';
import SearchForm from './SearchForm';
import SuggestionList from './SuggestionList';
import NavigationBar from './NavigationBar';
import ListComponent from './ListComponent';

import Suggestions from './Suggestions';
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';

import {
  axiosWithUserAuth,
  axiosWithSpotifyAuth
} from '../utils/axiosWithAuth';

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
  },
  mainContainer: {
    paddingTop: '30px'
  }
}));

const FavoritesPage = () => {
  const [favorites, setFavorites] = useState([]);
  const [favAverages, setFavAverages] = useState([]);
  const [results, setResults] = useState([]);
  const [suggestions, setSuggestions] = useState([]);
  const [isShowing, setIsShowing] = useState('search');
  const { userId, setUserId } = useContext(UserContext);
  const classes = useStyles();

  useEffect(() => {
    console.log('userId', userId);
    if (!userId) {
      setUserId(localStorage.getItem('userId'));
    }
    axiosWithUserAuth()
      .get(
        `https://spotify-suggester1.herokuapp.com/api/users/${userId}/favorites`
      )
      .then((res) => {
        setFavorites(res.data.favorite_songs);
        // calcAverages(res.data.favorite_songs);
      })
      .catch((err) => console.error('err', err.response));
  }, [userId]);

  useEffect(() => {
    calcAverages();
  }, [favorites]);

  const calcAverages = () => {
    let result = [
      {
        feature: 'danceability',
        value: 0
      },
      {
        feature: 'energy',
        value: 0
      },

      {
        feature: 'liveness',
        value: 0
      },
      {
        feature: 'loudness',
        value: 0
      },
      {
        feature: 'speechiness',
        value: 0
      },
      {
        feature: 'valence',
        value: 0
      },
      {
        feature: 'tempo',
        value: 0
      },
      {
        feature: 'instrumentalness',
        value: 0
      }
    ];

    favorites.forEach((song) => {
      result.forEach((item, index) => {
        result[index].value +=
          parseFloat(song[item.feature]) / favorites.length;
      });
    });
    console.log(result);
    setFavAverages(result);
  };

  const addFavorite = (song) => {
    if (!favorites.includes(song)) {
      axiosWithUserAuth()
        .post(
          `https://spotify-suggester1.herokuapp.com/api/users/${userId}/favorites`,
          { song_id: song.id }
        )
        .then((res) => {
          console.log('post response', res);
          setFavorites(res.data.favorite_songs);
        })
        .catch((err) => console.error('post error', err.message));
    }
  };

  const removeFavorite = (song) => {
    axiosWithUserAuth()
      .delete(
        `https://spotify-suggester1.herokuapp.com/api/users/${userId}/favorites/${song.id}`
      )
      .then((res) => {
        console.log('delete response', res);
        setFavorites(res.data.favorite_songs);
      })
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
        removeFavorite,
        favAverages
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
          ) : (
            <Suggestions />
          )}
        </Container>
      </Container>
    </FavoritesContext.Provider>
  );
};

export default FavoritesPage;
