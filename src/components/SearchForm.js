// Form that allows user to search for song by title, artist, genre, etc.
import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';

const SearchForm = () => {
  return (
    <>
      <form>
        <TextField
          name='search-bar'
          id='search-bar'
          label='Search your favorites songs'
          fullWidth
        />
        <Button variant='contained' color='secondary'>
          Search
        </Button>
      </form>
    </>
  );
};

export default SearchForm;
