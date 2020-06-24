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

const useStyles = makeStyles(() => ({
  container: {
    margin: '0',
    padding: '0'
  },
  formContainer: {
    padding: '20px 0 30px'
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
      backgroundColor: '#6C63FF'
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
    const searchString = searchTerm.replace(' ', '%20');

    e.preventDefault();
    axiosWithSpotifyAuth()
      .get(
        `https://api.spotify.com/v1/search?q=${searchString}&type=track%2Cartist&market=US&limit=10&offset=5`
      )
      .then((res) => console.log('spotify get req', res))
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
            label='Search your favorites songs'
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

    // <>
    //   <form>
    //
    //     <Button variant='contained' color='secondary'>
    //       Search
    //     </Button>
    //   </form>
    // </>
  );
};

export default SearchForm;
