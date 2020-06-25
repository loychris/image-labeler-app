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
import UploadForm from './components/';
import Achievements from './components/Achievements/Achievements';



function App()  {


    const [token, setToken] = useState("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI1ZWY0MDI5ZWIxY2Q0YTdkNDQxZGI0NTYiLCJpYXQiOjE1OTMwNDk3NTh9.skKvmVRYbUW71o7dq28u0JszqJ6iwBHxOLdd8F61yZ4");
    const [userId, setUserId] = useState(false);
    const [currentCategory, setCurrentCategory] = useState('');


    const login = useCallback((uid, token) => {
      setToken(token);
      setUserId(uid);
    }, []);
  
    const logout = useCallback(() => {
      console.log('Logging out');
      setToken(null);
      setUserId(null);
    }, []);

    let routes; 

    if (token) {
      routes = (
        <Switch>
          <Route exact path={['/', '/login']}>
            <Overview token={token}/>
          </Route>
          <Route exact path= '/imageQueue'>
            <ImageQueue token={token} category={currentCategory}/>
          </Route>
          <main className='main'>
              <Route exact path='/uploadForm'>
                <UploadForm token={token}/>
              </Route>
            </main>
          <Redirect to="/" />
        </Switch>
      );
    } else {
      routes = (
        <Switch>
          <Route exact path='/login' >
            <Auth/>
          </Route>
          <Redirect to="/auth" />
        </Switch>
      );
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
            {routes}
            <Route
              exact
              path='/achievements'
              component={Achievements}/>

          </div>
        </Router>
      </AuthContext.Provider>

    );
}

export default App;