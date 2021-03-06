import React, { useState, useEffect, useContext } from 'react';
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';
import { Route, Switch } from 'react-router-dom';
import FavoritesList from './FavoritesList';
import SearchForm from './SearchForm';
import CircularProgress from '@material-ui/core/CircularProgress';
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
  const [page, setPage] = useState(0);
  const [Loading, setLoading] = useState(false);

  const { userId, setUserId } = useContext(UserContext);

  const classes = useStyles();

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
      },
      {
        feature: 'tempo',
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
          `https://spotify-suggester-be.herokuapp.com/api/users/${userId}/favorites`,
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
        `https://spotify-suggester-be.herokuapp.com/api/users/${userId}/favorites/${song.id}`
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
        setPage,
        Loading,
        setLoading
      }}
    >
      <Container className={classes.container} maxWidth='full'>
        <NavigationBar />
        <FavoritesList />
        <Container className={classes.emptyContainer} />
        <Container className={classes.mainContainer}>
          <Switch>
            <Route exact path='/favorites'>
              <SearchForm />
              <ListComponent />
              {Loading ? (
                <CircularProgress
                  style={{
                    position: 'relative',
                    left: '48%',
                    margin: '50px auto',
                    color: '#FF6584'
                  }}
                />
              ) : null}
            </Route>
            <Route exact path='/favorites/suggestions'>
              <Suggestions />
              <ListComponent type='suggestions' />
              {Loading ? (
                <CircularProgress
                  style={{
                    position: 'relative',
                    left: '48%',
                    margin: '50px auto',
                    color: '#FF6584'
                  }}
                />
              ) : null}
            </Route>
            <Route path='/favorites'>
              <SearchForm />
              <ListComponent />
            </Route>
          </Switch>
        </Container>
      </Container>
    </FavoritesContext.Provider>
  );
};

export default FavoritesPage;
