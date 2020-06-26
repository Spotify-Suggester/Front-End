import React, { useState, useEffect, useContext } from 'react';
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';

import FavoritesList from './FavoritesList';
import SearchForm from './SearchForm';
import NavigationBar from './NavigationBar';
import ListComponent from './ListComponent';
import Suggestions from './Suggestions';
import { axiosWithUserAuth } from '../utils/axiosWithAuth';

import { UserContext } from '../contexts/UserContext';
import { FavoritesContext } from '../contexts/FavoritesContext';

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
  const [page, setPage] = useState(0);
  const { userId, setUserId } = useContext(UserContext);
  const classes = useStyles();

  useEffect(() => {
    if (!userId) {
      setUserId(localStorage.getItem('userId'));
    }

    axiosWithUserAuth()
      .get(
        `https://spotify-suggester1.herokuapp.com/api/users/${userId}/favorites`
      )
      .then((res) => {
        setFavorites(res.data.favorite_songs);
      })
      .catch((err) => console.error('err', err.message));
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
        feature: 'acousticness',
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
        setFavorites(res.data.favorite_songs);
      })
      .catch((err) => console.error('delete error', err.message));
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
        favAverages,
        page,
        setPage
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
