import React, { useState } from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import { UserContext } from './contexts/UserContext';
import Login from './components/Login';
import PrivateRoute from './components/PrivateRoute';
import FavoritesPage from './components/FavoritesPage';

function App() {
  const [userId, setUserId] = useState('');

  return (
    <div className='container'>
      <Router>
        <h1>Spotify Song Suggester</h1>
        <UserContext.Provider value={{ userId, setUserId }}>
          <Route exact path='/' component={Login} />
          <PrivateRoute path='/favorites' component={FavoritesPage} />
        </UserContext.Provider>
      </Router>
    </div>
  );
}

export default App;
