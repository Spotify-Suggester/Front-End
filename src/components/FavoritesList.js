// will iterate through array of user's favorite songs and render each Favorite
import React, { useContext } from 'react';
import { FavoritesContext } from '../context/FavoritesContext';

const FavoritesList = () => {
  const { favorites, setFavorites } = useContext(FavoritesContext);
  return favorites.length === 0 ? (
    <h3>Choose some favorites</h3>
  ) : (
    <>
      <h3>FavoritesList</h3>
      {favorites.map((favorite) => {
        return (
          <div key={favorite.id}>
            <h4>{favorite.name}</h4>
            <p>Artist: {favorite.artists[0].name}</p>
            <p>Album: {favorite.album.name}</p>
            <button
              onClick={() =>
                setFavorites(favorites.filter((item) => item.id != favorite.id))
              }
            >
              remove
            </button>
          </div>
        );
      })}
    </>
  );
};

export default FavoritesList;
