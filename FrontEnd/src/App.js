import React, { useState} from 'react';
import './App.css';

import SignIn from './components/signIN/signIn.jsx';
import SignUp from './components/signUP/signUp.jsx';
import Home from './components/home/Home.jsx';
import { AUTH_TOKEN } from './constants'
import { Switch, Route, Redirect } from 'react-router-dom';

function App() {
  //SETUP MAIN STATES TO KEEP TRACK, BASIC
  const token = localStorage.getItem(AUTH_TOKEN);
  const [login, setLogin] = useState(false);

  return (
    <Switch>
      <Route
        exact
        path="/"
        component={() =>
          token ? (
            <Home  />
          ) : (
            <Redirect to="/SignIn" />
          )
        }
      />
      <Route
        exact
        path="/SignIn"
        component={() => <SignIn setLogin={setLogin}/>}
      />
      <Route exact path="/SignUp" component={() => <SignUp />} />
    </Switch>
  );
}

export default App;
