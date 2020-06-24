// User can request suggested songs based on what they are in the mood for ( acousticness, danceability, duration, energy, etc)
import React, { useContext } from 'react';
import { FavoritesContext } from '../contexts/FavoritesContext';

const Suggestions = () => {
  const { suggestions } = useContext(FavoritesContext);

  return (
    <>
      <h3>Suggestions</h3>
      {suggestions.map((song) => (
        <p>{song.name}</p>
      ))}
    </>
  );
};

export default Suggestions;
