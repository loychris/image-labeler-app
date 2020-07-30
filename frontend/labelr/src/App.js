import React, { useState, useEffect, useCallback } from 'react';
import { BrowserRouter as Router, Route, Redirect, Switch } from 'react-router-dom';
import { AuthContext } from './components/context/auth-context';
import axios from 'axios';
import './App.css';

import Auth from './components/Auth/Auth';
import Menu from './components/Menu/Menu';
import Overview from './components/Overview/Overview';
import ImageQueue from './components/ImageQueue/ImageQueue';
import UploadForm from './components/UploadForm/UploadForm';
import Achievements from './components/Achievements/Achievements';
import Highscore from './components/Highscore/Highscore';
import UploaderHome from './components/UploaderHome/UploaderHome';
import Analytics from './components/Analytics/Analytics';

let logoutTimer;

const App = () => {
    const [token, setToken] = useState(null); 
    const [tokenExpirationDate, setTokenExpirationDate] = useState();
    const [user, setUser] = useState(null);

    const login = useCallback((user, token, expirationDate) => {
      console.log('LOGGING IN');
      setToken(token);
      setUser(user);
      const tokenExpirationDate = expirationDate || new Date(new Date().getTime() + 1000 * 60 * 60); 
      setTokenExpirationDate(tokenExpirationDate);

      localStorage.setItem(
        'userData',
        JSON.stringify({
          user: user, 
          token: token,
          expiration: tokenExpirationDate.toISOString()
        })
      )
    }, []);
  
    const logout = useCallback(() => {
      console.log('Logging out');
      const currentToken = JSON.parse(localStorage.getItem('userData')).token;
      localStorage.removeItem('userData')
      axios.post(
        '/users/logout',
        {},
        {
          headers: { Authorization: `Bearer ${currentToken}` }
        }
      )
      .then()
      .catch(console.log)
      setToken(null);
      setUser(null);
      setTokenExpirationDate(null);
    }, []);

    useEffect(() => {
      if (token && tokenExpirationDate) {
        const remainingTime = tokenExpirationDate.getTime() - new Date().getTime();
        logoutTimer = setTimeout(logout, remainingTime);
      } else {
        clearTimeout(logoutTimer);
      }
    }, [token, logout, tokenExpirationDate]);
  
    useEffect(() => {
      const storedData = JSON.parse(localStorage.getItem('userData'));
      if (
        storedData &&
        storedData.token &&
        new Date(storedData.expiration) > new Date()
      ) {
        login(storedData.user, storedData.token, new Date(storedData.expiration));
      }
    }, [login]);

    let routes;


    if(token && user){
      if(user.isUploader){
        routes = 
        <Switch>
          <Route exact path= '/imageQueue/:category/:cid'
            component={ImageQueue}
          />
          <Route exact path='/overview'
            component={Overview}
          />
          <Route exact path='/highscore'
            component={Highscore}
          />
          <Route exact path='/achievements'
            component={Achievements}
          />
          <Route exact path='/analytics'
            component={Analytics}
          />
          <Route exact path='/uploadForm' 
            component={UploadForm}exact
          />
          <Route exact path='/uploaderHome'
            component={UploaderHome}
          />
          <Route exact path='/categories'
            component={Overview}/>
        </Switch>
      }else {
        routes = 
        <Switch>
          <Route path= '/imageQueue/:category/:cid'
            component={ImageQueue}
          />
          <Route exact path='/highscore'
            component={Highscore}
          />
          <Route exact path='/achievements'
            component={Achievements}
          />
          <Redirect to='/'/>
        </Switch>

      }
    } else {
      routes = <Redirect to='/'/> 
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
            <div className='Background'></div>
            <Menu 
              logout={logout}       // function to be called when loggin out 
              loggedIn={!!token}    // true if logged in
              isUploader={user ? user.isUploader : false} // true, if logged in as uploader
            />
            <Route exact path={'/'} 
              component={user && user.isUploader ? UploaderHome : Overview}
            />
            {routes}
            <Auth login={login} loggedIn={token ? true : false }/>
          </div>
        </Router>
      </AuthContext.Provider>
    );
}

export default App;