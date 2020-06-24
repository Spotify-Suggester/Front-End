import React, { useContext } from 'react';
import { FavoritesContext } from '../contexts/FavoritesContext';

const Suggestions = () => {
  const { suggestions, addFavorite } = useContext(FavoritesContext);

  return (
    <>
      <h3>Suggestions</h3>
      {suggestions
        ? suggestions.map((song) => (
            <div>
              <p>Title: {song.name}</p>
              <p>Artist: {song.artist}</p>
              <p>Album: {song.album}</p>
              <button onClick={() => addFavorite(song)}>
                add to favorites
              </button>
            </div>
          ))
        : null}
    </>
  );
};

export default Suggestions;
