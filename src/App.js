import React, {useState} from "react";
import {BrowserRouter as Router, Route, Switch} from "react-router-dom";
import {UserContext} from "./contexts/UserContext";
import Login from "./components/Login";
import PrivateRoute from "./components/PrivateRoute";
import FavoritesPage from "./components/FavoritesPage";

function App() {
  const [userId, setUserId] = useState("");
  const [loginData, setLoginData] = useState({
    username: "",
    password: "",
    confirmPassword: "",
  });

  const [isLoading, setIsLoading] = useState(false);

  return (
    <div className="container">
      <Router>
        <UserContext.Provider
          value={{
            userId,
            setUserId,
            loginData,
            setLoginData,
            isLoading,
            setIsLoading,
          }}
        >
          <Switch>
            <PrivateRoute path="/favorites" component={FavoritesPage} />
            <Route path="/" component={Login} />
          </Switch>
        </UserContext.Provider>
      </Router>
    </div>
  );
}

export default App;
