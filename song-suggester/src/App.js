import React from 'react';
import Login from './components/Login';
import FavoritesForm from './components/FavoritesForm';
import FavoritesList from './components/FavoritesList';

function App() {
  return (
    <>
      <h1>Spotify Song Suggester</h1>
      <Login />
      <FavoritesForm />
      <FavoritesList />
    </>
  );
}

export default App;
