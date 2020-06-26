import React, { useState, useContext } from 'react';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/core/Slider';
import { Container, Grid, Box } from '@material-ui/core';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';

import ListComponent from './ListComponent';
import { axiosWithUserAuth } from '../utils/axiosWithAuth';

import { FavoritesContext } from '../contexts/FavoritesContext';
import { UserContext } from '../contexts/UserContext';

const useStyle = makeStyles(() => ({
  paper: {
    display: 'flex',
    flexWrap: 'wrap',
    margin: "-30px 0 20px",
    padding: " 20px 10px 0px",
    position: 'relative',
    width: "100%",
    color: 'white',
    border: '1px solid #6c63FF',
    background: 'rgba(0,0,0,.45)',
    '& .MuiButton-root': {
      backgroundColor: '#6C63FF',
      color: 'white',
      maxHeight: '50px',
      margin: "-5px 2%",
      width: '16%',
      '&:hover': {
        background: '#4a41d4'
      }
    },
    '& .MuiSlider-root': {
      color: '#ff6584'
    }
  },
  box: {
    display: 'flex',
    flexDirection: 'column',
    margin: '0 2% 15px',
    width: "16%",
    "& p": {
      marginBottom: "-5px"
    }
  },
  container: {
    margin: '0',
    padding: '0',
    width: "100%"
  },
}));

const Suggestions = () => {
  const classes = useStyle();

  const [features, setFeatures] = useState([
    {
      feature: 'danceability',
      value: 0,
      max: 1,
      min: 0,
      steps: 0.1
    },
    {
      feature: 'energy',
      value: 0,
      max: 1,
      min: 0,
      steps: 0.1
    },
    {
      feature: 'instrumentalness',
      value: 0,
      max: 1,
      min: 0,
      steps: 0.1
    },
    {
      feature: 'liveness',
      value: 0,
      max: 1,
      min: 0,
      steps: 0.1
    },
    {
      feature: 'acousticness',
      value: 0,
      max: 1,
      min: 0,
      steps: 0.1
    },
    {
      feature: 'loudness',
      value: -60,
      max: 0,
      min: -60,
      steps: 5
    },
    {
      feature: 'speechiness',
      value: 0,
      max: 1,
      min: 0,
      steps: 0.1
    },
    {
      feature: 'valence',
      value: 0,
      max: 1,
      min: 0,
      steps: 0.1
    },
    {
      feature: 'tempo',
      value: 0,
      max: 250,
      min: 0,
      steps: 10
    }
  ]);

  const { setSuggestions } = useContext(FavoritesContext);
  const { userId } = useContext(UserContext);

  const handleChange = (index, value) => {
    let array = features;
    array[index].value = value;
    setFeatures(array);
  };

  const updateSuggestions = () => {
    let mood = {};
    features.forEach((item) => (mood[item.feature] = item.value));

    axiosWithUserAuth()
      .post(
        `https://spotify-suggester1.herokuapp.com/api/users/${userId}/recommend`,
        mood
      )
      .then((res) => {
        setSuggestions(res.data.recommended_songs);
      })
      .catch((err) => console.error('get err', err.message));
  };

  return (
    <>
    <Container maxWidth={false} className={classes.container}>
      <Grid item xs={12} md={12} className={classes.formContainer}>
        <Paper className={classes.paper} square>
          {features.map((features, index) => (
            <Box className={classes.box}>
              <Typography id='discrete-slider' gutterBottom>
                {features.feature}
              </Typography>
              <Slider
                defaultValue={features.value}
                aria-labelledby='discrete-slider'
                valueLabelDisplay='auto'
                step={features.steps}
                marks
                min={features.min}
                max={features.max}
                onChangeCommitted={(e, val) => {
                  handleChange(index, val);
                }}
              />
            </Box>
          ))}
          <Button size='large' onClick={updateSuggestions}>
            Update
          </Button>
        </Paper>
      </Grid>
    </Container>
    </>
  );
};

export default Suggestions;
