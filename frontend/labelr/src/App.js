import React, { useState, useCallback } from 'react';
import {
  BrowserRouter as Router,
  Route,
  Redirect,
  Switch
} from 'react-router-dom';import { AuthContext } from './components/context/auth-context';

import './App.css';

import Auth from './components/Auth/Auth';
import Menu from './components/Menu/Menu';
import Overview from './components/Overview/Overview';
import ImageQueue from './components/ImageQueue/ImageQueue';
import UploadForm from './components/UploadForm/UploadForm';
import Achievements from './components/Achievements/Achievements';


function App()  {

    //const [token, setToken] = useState("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZWY0NDc4ODViOWI2NjRiYWQ3OWRjZTIiLCJpYXQiOjE1OTMwNjc0MDB9.n_v6Z3orkod6S7UgDS0t9sjeQhrgb6JctbVvTr3bMpk");
    const [token, setToken] = useState(null); 
    const [user, setUser] = useState(false);
    const [currentCategory, setCurrentCategory] = useState('');

    const login = useCallback((user, token) => {
      setToken(token);
      setUser(user);
    }, []);
  
    const logout = useCallback(() => {
      console.log('Logging out');
      setToken(null);
      setUser(null);
    }, []);

    let routes;

    if(token){
      routes = 
        <Switch>
          <Route exact path= '/imageQueue'>
            <ImageQueue token={token} category={currentCategory}/>
          </Route>
          <Route exact path='/uploadForm'>
            <UploadForm token={token}/>
          </Route>
          <Redirect to="/" />
          <Route
            exact
            path='/achievements'
            component={Achievements}/>
        </Switch>
    }else {
      routes = 
        <Switch>
          <Route exact path='/uploadForm'>
            <UploadForm token={token}/>
          </Route>
          <Route exact path='/login'>
              <Auth token={token} login={login}/>
          </Route>
          <Redirect to="/login" />
        </Switch>
    }


    return (
      <AuthContext.Provider 
        value={{
          isLoggedIn: !!token, 
          token: token,
          login: login, 
          logout: logout
        }}>
        <Router>
          <div className="App">
            <Menu logout={logout}/>
            <Route path= '/imageQueue'>
              <ImageQueue token={token} category={currentCategory}/>
            </Route>
            <Route exact path={['/', '/login']}>
              <Overview token={token}/>
            </Route>
            {routes}
          </div>
        </Router>
              </AuthContext.Provider>
    );
}

export default App;
