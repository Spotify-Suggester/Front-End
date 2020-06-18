import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';

import Login from './components/Login';
import PrivateRoute from './components/PrivateRoute';
import Favorites from './components/Favorites';

function App() {
  return (
    <Router>
      <h1>Spotify Song Suggester</h1>
      <Route exact path='/' component={Login} />
      <Route path='/favorites' component={Favorites} />
      {/* '/favorites' will become a PrivateRoute */}
    </Router>
  );
}

export default App;
