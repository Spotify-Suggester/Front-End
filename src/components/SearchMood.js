import React, { useState } from 'react';
import ListComponent from './ListComponent';
import Paper from '@material-ui/core/Paper';
import Typography from '@material-ui/core/Typography';
import Slider from '@material-ui/core/Slider';
import Box from '@material-ui/core/Box';
import Button from '@material-ui/core/Button';
import { makeStyles } from '@material-ui/core/styles';

const useStyle = makeStyles(() => ({
  paper: {
    display: 'flex',
    padding: '40px 20px 10px',
    marginTop: '-50px',
    marginBottom: '30px',
    color: 'white',
    border: '1px solid #6c63FF',
    background: 'rgba(0,0,0,.45)',
    '& .MuiButton-root': {
      backgroundColor: '#6C63FF',
      color: 'white',
      maxHeight: '50px',
      marginLeft: '20px',
      width: '150px',
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
    width: '20%',
    margin: '0 15px'
  }
}));

const SearchMood = () => {
  const classes = useStyle();
  const [features, setFeatures] = useState([
    {
      feature: 'danceability',
      value: 0
    },
    {
      feature: 'energy',
      value: 0
    },
    {
      feature: 'instrumentalness',
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
      feature: 'tempo',
      value: 0
    }
  ]);

  const handleChange = (index, value) => {
    let array = features;
    array[index].value = value;
    setFeatures(array);
  };

  let mood = {};
  features.forEach((item) => (mood[item.feature] = item.value));
  console.log(JSON.stringify(mood));

  // const getSuggestions = () => {
  //   axiosWithUserAuth()
  //     .get(
  //       `https://spotify-suggester1.herokuapp.com/api/users/${userId}/recommend`
  //     )
  //     .then((res) => {
  //       console.log('get res', res);
  //       setSuggestions(res.data.recommended_songs);
  //     })
  //     .catch((err) => console.error('get err', err.message));
  // };

  return (
    <>
      <Paper className={classes.paper} square>
        {features.map((features, index) => (
          <Box className={classes.box}>
            <Typography id='discrete-slider' gutterBottom>
              {features.feature}
            </Typography>
            <Slider
              defaultValue={0}
              aria-labelledby='discrete-slider'
              valueLabelDisplay='auto'
              step={0.1}
              marks
              min={0}
              max={1}
              onChangeCommitted={(e, val) => {
                handleChange(index, val);
              }}
            />
          </Box>
        ))}
        <Button size='large'>Search</Button>
      </Paper>
      <ListComponent />
    </>
  );
};

export default SearchMood;
