// Form that allows user to search for song by title, artist, genre, etc.
import React, { useState, useContext, useEffect } from 'react';
import * as yup from 'yup';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import { Container, Grid, Box } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import {
  axiosWithUserAuth,
  axiosWithSpotifyAuth
} from '../utils/axiosWithAuth';
import { FavoritesContext } from '../contexts/FavoritesContext';

const useStyles = makeStyles(() => ({
  container: {
    margin: '0',
    padding: '0'
  },
  formContainer: {
    padding: '0px 0 30px'
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

const SearchForm = () => {
  const classes = useStyles();

  const [searchTerm, setSearchTerm] = useState('');
  const [error, setError] = useState('');
  const [isButtonDisabled, setIsButtonDisabled] = useState(true);
  const { setResults } = useContext(FavoritesContext);

  // const formSchema = yup.object().shape({
  //   searchTerm: yup.string().required('Search term is required')
  // });

  // const validateChange = (e) => {
  //   yup
  //     .reach(formSchema, searchTerm)
  //     .validate(e.target.value)
  //     .then((valid) => {
  //       setError('');
  //     })
  //     .catch((err) => setError(err.errors[0]));
  // };

  useEffect(() => {
    // formSchema.isValid(searchTerm).then((valid) => {
    //   setIsButtonDisabled(!valid);
    // });
    console.log('searchTerm', searchTerm);
  }, [searchTerm]);

  const formSubmit = (e) => {
    setResults([]);

    const searchString = searchTerm.replace(' ', '%20');

    e.preventDefault();
    axiosWithSpotifyAuth()
      .get(
        `https://api.spotify.com/v1/search?q=${searchString}&type=track%2Cartist&market=US&limit=10&offset=5`
      )
      .then((res) => {
        console.log('spotify get req', res.data.tracks.items);
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
        console.log('songs', songs);
        setResults(songs);
      })
      .catch((err) => console.error('spotify get req error', err));

    setSearchTerm('');
  };

  const inputChange = (e) => {
    e.persist();
    // validateChange(e);
    setSearchTerm(e.target.value);
  };

  return (
    <Container maxWidth={false} className={classes.container}>
      <Grid item xs={12} md={12} className={classes.formContainer}>
        <Box className={classes.form}>
          <TextField
            name='search-bar'
            id='search-bar'
            label='Search your favorites songs or artist'
            fullWidth
            onChange={inputChange}
            value={searchTerm}
          />
          <Button
            variant='contained'
            color='secondary'
            disabled={searchTerm === '' ? true : false}
            type='submit'
            onClick={formSubmit}
          >
            Search
          </Button>
        </Box>
      </Grid>
    </Container>
  );
};

export default SearchForm;
