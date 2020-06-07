import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import './App.css';

import Auth from './components/Auth/Auth';
import Menu from './components/Menu/Menu';
import Overview from './components/Overview/Overview';

class App extends Component {

  render(){
    return (
      <div className="App">
        <Route 
          exact
          path='/login'
          component={Auth}/>
        <Menu/>
        <Route
          exact
          path={['/', '/login']}
          component={Overview}/>
      </div>
    );
  }

}

export default App;
