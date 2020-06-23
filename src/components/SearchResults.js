import React, { useContext } from 'react';
import { FavoritesContext } from '../contexts/FavoritesContext';

const SearchResults = () => {
  const { favorites, setFavorites, results } = useContext(FavoritesContext);

  return (
    <>
      <h3>SearchResults</h3>
      {results.map((result) => {
        return (
          <div key={result.id}>
            <h4>{result.name}</h4>
            <p>Artist: {result.artists[0].name}</p>
            <p>Album: {result.album.name}</p>
            <button onClick={() => setFavorites([...favorites, result])}>
              add to favorites
            </button>
          </div>
        );
      })}
    </>
  );
};

export default SearchResults;
