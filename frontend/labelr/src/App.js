import React, { useState, useEffect, useCallback } from 'react';
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
import Highscore from './components/Highscore/Highscore';
import UploaderHome from './components/UploaderHome/UploaderHome';

let logoutTimer;

const App = () => {
    const [token, setToken] = useState(null); 
    const [tokenExpirationDate, setTokenExpirationDate] = useState();
    const [user, setUser] = useState(null);

    const login = useCallback((user, token, expirationDate) => {
      setToken(token);
      setUser(user);
      const tokenExpirationDate = expirationDate || new Date(new Date().getTime() + 1000 * 60 * 60); 
      setTokenExpirationDate(tokenExpirationDate);
      localStorage.setItem(
        'userData',
        JSON.stringify({
          userId: user, 
          token: token,
          expiration: tokenExpirationDate.toISOString()
        })
      )
    }, []);
  
    const logout = useCallback(() => {
      console.log('Logging out');
      setToken(null);
      setTokenExpirationDate(null);
      setUser(null);
      localStorage.removeItem('userData')
    }, []);

    useEffect(() => {
      if(token && tokenExpirationDate) {
        const remainingTime = tokenExpirationDate.getTime() - new Date().getTime(); 
        logoutTimer = setTimeout(logout, remainingTime);
      } else {
        clearTimeout(logoutTimer);
      }
    }, [token, logout, tokenExpirationDate])

    useEffect(() => {
      const storedData = JSON.parse(localStorage.getItem('userData'));
      if(storedData && storedData.token && new Date(storedData.expiration) > new Date()){
        login(storedData.user, storedData.token)
      }
    }, [login])

    let routes;


    if(token && user){
      if(user.isUploader){
        routes = 
        <Switch>
          <Route exact path= '/imageQueue/:category'
            component={ImageQueue}
          />
          <Route exact path='/highscore'
            component={Highscore}
          />
          <Route exact path='/achievements'
            component={Achievements}
          />

          <Route exact path='/uploadForm' 
            component={UploadForm}
          />
          <Route exact path='/uploaderHome'
            component={UploaderHome}
          />
          <Route exact path='/categories'
            component={Overview}/>
          <Redirect to="/" />
        </Switch>
      }else {
        routes = 
        <Switch>
          <Route exact path= '/imageQueue/:category'
            component={ImageQueue}
          />
          <Route exact path='/highscore'
            component={Highscore}
          />
          <Route exact path='/achievements'
            component={Achievements}
          />
        </Switch>
      }
    }else{
      routes = <Redirect to='/login'/>
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
            <Menu 
              logout={logout}       // function to be called when loggin out 
              loggedIn={!!token}    // true if logged in
              isUploader={user ? user.isUploader : false} // true, if logged in as uploader
            />
            <Route exact path={['/', '/login']} 
              component={user && user.isUploader ? UploaderHome : Overview}
            />
            {routes}
            <Route exact path={['/login']} 
              component={() => <Auth loggedIn={!!token} login={login}/>}
            />
          </div>
        </Router>
      </AuthContext.Provider>
    );
}

export default App;
