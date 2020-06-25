import React, { useState } from 'react';
import { FavoritesContext } from '../context/FavoritesContext';
import FavoritesList from './FavoritesList';
import SearchForm from './SearchForm';
import SuggestionList from './SuggestionList';
import NavigationBar from './NavigationBar'
import ListComponent from './ListComponent';

import SearchMood from "./SearchMood"
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
 mainContainer: {
  paddingTop: "30px"
 }
 
}))

const FavoritesPage = () => {
  const [favorites, setFavorites] = useState([]);
  const [results, setResults] = useState(data);
  const [isShowing, setIsShowing] = useState("search")
  const classes = useStyles()

  return (
    <FavoritesContext.Provider value={{ favorites, setFavorites, results }}>
      <Container className={classes.container} maxWidth="full">
        <NavigationBar setIsShowing={setIsShowing}/>
        <FavoritesList setIsShowing={setIsShowing}/>
        <Container className={classes.emptyContainer}/>
        <Container className={classes.mainContainer}>
          {(isShowing === "search")?(
            <>
              <SearchForm />
              <ListComponent />
            </>
          ):(isShowing === "mood")? (
            <SearchMood />
          ):
          (
            <SuggestionList />
          )}
          {/* 
          <GenreListSearch /> */}
        </Container>
      </Container>
      
      
    </FavoritesContext.Provider>
  );
};

export default FavoritesPage;
