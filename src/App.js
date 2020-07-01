import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import Login from './components/Login';
import PrivateRoute from './components/PrivateRoute';
import FavoritesPage from './components/FavoritesPage';

import { UserContext } from './contexts/UserContext';

function App() {
  const [userId, setUserId] = useState('');

  return (
    <div className='container'>
      <Router>
        <UserContext.Provider
          value={{
            userId,
            setUserId
          }}
        >
          <Switch>
            <PrivateRoute path='/favorites' component={FavoritesPage} />
            <Route path='/' component={Login} />
          </Switch>
        </UserContext.Provider>
      </Router>
    </div>
  );
}

export default App;
