import React, { useContext, useState, useEffect } from 'react';
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import CircularProgress from '@material-ui/core/CircularProgress';
import { Link } from 'react-router-dom';
import ListComponent from './ListComponent';
import { axiosWithUserAuth } from '../utils/axiosWithAuth';

import { UserContext } from '../contexts/UserContext';
import { FavoritesContext } from '../contexts/FavoritesContext';

const useStyles = makeStyles(() => ({
  container: {
    width: '450px',
    margin: '0',
    borderRight: '1px solid #6c63FF',
    background: 'rgba(0,0,0,.45)',
    position: 'fixed',
    zIndex: '100',
    top: 65,
    bottom: 0,
    '& .MuiButton-contained': {
      backgroundColor: '#6C63FF',
      color: 'white',
      width: 'calc(100% - 48px)',
      position: 'absolute',
      bottom: '30px',
      '&:hover': {
        background: '#4a41d4'
      }
    },
    '& .MuiButton-contained.Mui-disabled': {
      color: 'rgba(0, 0, 0, .45)'
    }
  },
  header: {
    fontWeight: 300,
    textAlign: 'center'
  }
}));

const FavoritesList = ({ setIsShowing }) => {
  const classes = useStyles();

  const { userId, setUserId } = useContext(UserContext);
  const {
    favorites,
    setSuggestions,
    favAverages,
    setFavorites,
    setLoading
  } = useContext(FavoritesContext);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (!userId) {
      setUserId(localStorage.getItem('userId'));
    }
    setIsLoading(true);
    axiosWithUserAuth()
      .get(
        `https://spotify-suggester-be.herokuapp.com/api/users/${userId}/favorites`
      )
      .then((res) => {
        setFavorites(res.data.favorite_songs);
        setIsLoading(false);
      })
      .catch((err) => {
        setIsLoading(false);
        console.error('err', err.message);
      });
  }, [userId]);

  const getSuggestions = () => {
    let valuesToSend = {};
    favAverages.forEach((item) => (valuesToSend[item.feature] = item.value));
    setLoading(true);
    setSuggestions([]);
    axiosWithUserAuth()
      .post(
        `https://spotify-suggester-be.herokuapp.com/api/users/${userId}/recommend`,
        valuesToSend
      )
      .then((res) => {
        setSuggestions(res.data.recommended_songs);
        setLoading(false);
      })
      .catch((err) => {
        console.error('get err', err.message);
        setLoading(false);
      });
  };

  return (
    <Container className={classes.container}>
      <h2 className={classes.header}>Favorite Songs</h2>
      <ListComponent type='favorite' />
      {isLoading ? (
        <CircularProgress
          style={{
            position: 'absolute',
            left: '45%',
            marginTop: '50px',
            color: '#FF6584'
          }}
        />
      ) : null}

      <Link to='/favorites/suggestions'>
        <Button
          disabled={favorites.length < 5 ? true : false}
          variant='contained'
          size='large'
          onClick={() => {
            getSuggestions();
          }}
        >
          {favorites.length < 5
            ? `Please add ${5 - favorites.length} more ${
                5 - favorites.length === 1 ? 'Favorite' : 'Favorites'
              }`
            : 'Suggest Songs'}
        </Button>
      </Link>
    </Container>
  );
};

export default FavoritesList;
