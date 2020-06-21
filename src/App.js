import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Login from './components/Login';
import PrivateRoute from './components/PrivateRoute';
import FavoritesPage from './components/FavoritesPage';

function App() {
  return (
    <div className="container">

    
    <Router>
      <h1>Spotify Song Suggester</h1>
      <Route exact path='/' component={Login} />
      <Route path='/favorites' component={FavoritesPage} />
      {/* '/favorites' will become a PrivateRoute */}
    </Router>
    </div>
  );
}

export default App;
