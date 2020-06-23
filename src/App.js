import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import Login from './components/Login';
import PrivateRoute from './components/PrivateRoute';
import FavoritesPage from './components/FavoritesPage';

function App() {
  return (
    

    
    <Router>
      <Route exact path='/' component={Login} />
      <Route path='/favorites' component={FavoritesPage} />
      {/* '/favorites' will become a PrivateRoute */}
    </Router>
  );
}

export default App;
