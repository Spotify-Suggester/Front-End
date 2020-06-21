// Form that allows user to search for song by title, artist, genre, etc.
import React from 'react';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import {Container, Grid, Box} from "@material-ui/core";
import {makeStyles} from "@material-ui/core/styles";


const useStyles = makeStyles(() => ({
  container: {
    margin: '0',
    padding: '0'
  },
  formContainer: {
    padding: "20px 0 30px"
  },
  form: {
    display: "flex",
    position: "relative",
    width: "100%",
    color: "white",
    "& .MuiFormControl-fullWidth": {
      marginRight: "10px"
    },
    "& label, & input, & .MuiButton-contained": {
      color: "white",
    },

    "& .MuiButton-contained": {
      backgroundColor: "#6C63FF",
    },

    "& .MuiInput-underline:before": {
      borderBottomColor: "rgba(255, 255, 255, 0.7) !important;",
    },

    "& .MuiFormLabel-root.Mui-focused": {
      color: "#6C63FF !important",
    },

    "& .MuiInput-underline:after": {
      borderBottomColor: "#6C63FF !important",
    },

    "& .MuiButton-contained.Mui-disabled": {
      color: "rgba(0, 0, 0, .45)",
    },

    "& .MuiDivider-root": {
      backgroundColor: "rgba(255,255,255,0.7)",
    },
  },
}));

const SearchForm = () => {
  const classes = useStyles();
  return (
    <Container maxWidth={false} className={classes.container}>
      <Grid item xs={12} md={12} className={classes.formContainer}>
        <Box className={classes.form}>
          <TextField
            name='search-bar'
            id='search-bar'
            label='Search your favorites songs'
            fullWidth
          />
          <Button variant='contained' color='secondary'>
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
