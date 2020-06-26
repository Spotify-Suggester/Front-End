import React, { useState, useContext, useEffect } from 'react';
import * as Yup from 'yup';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { Container, Grid, Box } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

import { axiosWithSpotifyAuth } from '../utils/axiosWithAuth';

import { FavoritesContext } from '../contexts/FavoritesContext';

const useStyles = makeStyles(() => ({
  container: {
    margin: '0',
    padding: '0'
  },
  formContainer: {
    padding: '0px 0 30px',

    '& p': {
      backgroundColor: '#020215',
      color: '#FF6584',
      padding: '.5rem 1rem',
      fontSize: 14
    }
  },
  form: {
    display: 'flex',
    position: 'relative',
    width: '100%',
    color: 'white',
    '& .MuiFormControl-fullWidth': {
      marginRight: '10px'
    },
    '& label, & input, & .MuiButton-contained': {
      color: 'white'
    },

    '& .MuiButton-contained': {
      backgroundColor: '#6C63FF',
      '&:hover': {
        background: '#4a41d4'
      }
    },

    '& .MuiInput-underline:before': {
      borderBottomColor: 'rgba(255, 255, 255, 0.7) !important;'
    },

    '& .MuiFormLabel-root.Mui-focused': {
      color: '#6C63FF !important'
    },

    '& .MuiInput-underline:after': {
      borderBottomColor: '#6C63FF !important'
    },

    '& .MuiButton-contained.Mui-disabled': {
      color: 'rgba(0, 0, 0, .45)'
    },

    '& .MuiDivider-root': {
      backgroundColor: 'rgba(255,255,255,0.7)'
    }
  }
}));

const formSchema = Yup.object().shape({
  searchInput: Yup.string().required(
    'Please enter the name of a song or artist'
  )
});

const SearchForm = () => {
  const classes = useStyles();

  const [searchTerm, setSearchTerm] = useState({
    searchInput: ''
  });
  const [error, setError] = useState({
    searchInput: ''
  });
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);

  const { setResults, setPage } = useContext(FavoritesContext);

  useEffect(() => {
    formSchema.isValid(searchTerm).then((valid) => {
      setIsButtonDisabled(!valid);
    });
  }, [searchTerm]);

  const validateChange = (e) => {
    Yup.reach(formSchema, e.target.name)
      .validate(e.target.value)
      .then((valid) => {
        setError({
          ...error,
          [e.target.name]: ''
        });
      })
      .catch((err) => {
        setError({
          ...error,
          [e.target.name]: err.errors[0]
        });
      });
  };

  const inputChange = (e) => {
    e.persist();
    setSearchTerm({
      ...searchTerm,
      [e.target.name]: e.target.value
    });
    validateChange(e);
  };

  const formSubmit = (e) => {
    setResults([]);
    setPage(0);

    const searchString = searchTerm.searchInput.replace(' ', '%20');

    e.preventDefault();
    axiosWithSpotifyAuth()
      .get(
        `https://api.spotify.com/v1/search?q=${searchString}&type=track%2Cartist&market=US&limit=50&offset=5`
      )
      .then((res) => {
        const data = res.data.tracks.items;

        const songs = data.map((track) => {
          return {
            id: track.id,
            name: track.name,
            artist: track.artists[0].name,
            album: track.album.name,
            image_url: track.album.images[0].url
          };
        });
        setResults(songs);
      })
      .catch((err) => console.error('spotify get req error', err.message));

    setSearchTerm({
      searchInput: ''
    });
  };

  return (
    <Container maxWidth={false} className={classes.container}>
      <Grid item xs={12} md={12} className={classes.formContainer}>
        <Box className={classes.form}>
          <TextField
            name='searchInput'
            id='searchInput'
            label='Search for your favorite songs or artists'
            fullWidth
            onChange={inputChange}
            value={searchTerm.searchInput}
          />
          <Button
            variant='contained'
            color='secondary'
            disabled={isButtonDisabled}
            type='submit'
            onClick={formSubmit}
          >
            Search
          </Button>
        </Box>
        {error.searchInput.length > 0 ? <p class>{error.searchInput}</p> : null}
      </Grid>
    </Container>
  );
};

export default SearchForm;
