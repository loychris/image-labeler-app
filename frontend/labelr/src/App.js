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
import Highscore from './components/Highscore/Highscore';
import UploaderHome from './components/UploaderHome/UploaderHome';

function App()  {
    const [token, setToken] = useState(null); 
    const [user, setUser] = useState(false);

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
    let uploaderComponents;
    let homePage;

    

    if(token){
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
          <Route exact path='highscore'
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