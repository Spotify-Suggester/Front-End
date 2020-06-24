import React, { useState } from 'react';
import { FavoritesContext } from '../context/FavoritesContext';
import FavoritesList from './FavoritesList';
import SearchForm from './SearchForm';
import SuggestionForm from './SuggestionForm';
import NavigationBar from './NavigationBar'
import ListComponent from './ListComponent';
import RadarChart from './RadarChart'
import Container from '@material-ui/core/Container';
import {makeStyles} from "@material-ui/core/styles";

import { data } from '../data';
import GenreListSearch from './GenreListSearch';

const useStyles = makeStyles(() => ({
 container: {
   display: "flex",
   margin: "0",
   padding: "0",
   paddingTop: "64px"
 },
 emptyContainer:{
   width: "450px",
   minWidth: "450px",
   margin: "0"
 },
 
}))

const FavoritesPage = () => {
  const [favorites, setFavorites] = useState([]);
  const [results, setResults] = useState(data);
  const classes = useStyles()

  return (
    <FavoritesContext.Provider value={{ favorites, setFavorites, results }}>
      <Container className={classes.container} maxWidth="full">
        <NavigationBar />
        <FavoritesList />
        <Container className={classes.emptyContainer}/>
        <Container>
          <SearchForm />
          <ListComponent />
          <SuggestionForm />
          <RadarChart />
          <GenreListSearch />
          <RadarChart />
        </Container>
      </Container>
      
      
    </FavoritesContext.Provider>
  );
};

export default FavoritesPage;
