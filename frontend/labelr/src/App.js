import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import './App.css';

import Auth from './components/Auth/Auth';
import Menu from './components/Menu/Menu';
import Overview from './components/Overview/Overview';
import ImageQueue from './components/ImageQueue/ImageQueue';
import Achievements from './components/Achievements/Achievements';

class App extends Component {

  state = {
    currentCategory: null
  }

  setCurrentCategory = (category) => {
    this.setState({currentCategory: category});
  }

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
          render={ () => {
            return <Overview setCategory={this.setCurrentCategory}/>
          }}/>
        <Route 
        path= '/imageQueue'
        render={() => {
          return <ImageQueue category={this.state.currentCategory}/>
        }}/>
        <Route
        exact
        path='/achievements'
        component={Achievements}/>
      </div>
    );
  }

}

export default App;
