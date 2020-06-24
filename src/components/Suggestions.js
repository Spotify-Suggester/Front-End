import React, { useContext } from 'react';
import { FavoritesContext } from '../contexts/FavoritesContext';

const Suggestions = () => {
  const { suggestions } = useContext(FavoritesContext);

  return (
    <>
      <h3>Suggestions</h3>
      {suggestions ? suggestions.map((song) => <p>{song.name}</p>) : null}
    </>
  );
};

export default Suggestions;
