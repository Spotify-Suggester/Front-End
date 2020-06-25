// will iterate through array of user's favorite songs and render each Favorite
import React, { useContext } from 'react';
import { FavoritesContext } from '../contexts/FavoritesContext';
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';
import ListComponent from './ListComponent';
import Button from '@material-ui/core/Button';
import zIndex from '@material-ui/core/styles/zIndex';
import { axiosWithUserAuth } from '../utils/axiosWithAuth';

const useStyles = makeStyles(() => ({
  container: {
    width: "450px",
    margin: "0",
    borderRight: "1px solid #6c63FF",
    background: "rgba(0,0,0,.45)",
    position: "fixed",
    zIndex: "100",
    height: "100vh",
    "& .MuiButton-contained": {
      backgroundColor: "#6C63FF",
      color: "white",
      width: "calc(100% - 48px)",
      position: "absolute",
      bottom: "100px",
      "&:hover": {
        background: "#4a41d4"
      }
    },
  },
  header: {
    fontWeight: 300,
    textAlign: "center"
  }
}))
const FavoritesList = (props) => {
  const classes = useStyles();
  const { favorites, setFavorites, setSuggestions } = useContext(
    FavoritesContext
  );

  const getSuggestions = () => {
    let seeds = [];
    favorites.forEach((favorite) => seeds.push(favorite.id));
    axiosWithUserAuth()
      .get('https://spotify-suggester1.herokuapp.com/api/users/1/recommend')
      .then((res) => {
        console.log('get res', res);
        setSuggestions(res.data.recommended_songs);
      })
      .catch((err) => console.error('get err', err.message));
  };

  return (
    <Container className={classes.container}>
      <h2 className={classes.header}>Favorite Songs</h2>
      <ListComponent type='favorite' />
      <Button
        variant='contained'
        size='large'
        onClick={() => {
          props.setIsShowing('suggestions');
          getSuggestions();
        }}
      >
        Suggest Songs
      </Button>
    </Container>
  );
};

export default FavoritesList;
