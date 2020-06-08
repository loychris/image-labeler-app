import React, { Component } from 'react';
import { Route } from 'react-router-dom';
import './App.css';

import Auth from './components/Auth/Auth';
import Menu from './components/Menu/Menu';
import Overview from './components/Overview/Overview';
import ImageQueue from './components/ImageQueue/ImageQueue';
import BackButton from './components/BackButton/BackButton';

class App extends Component {

  state = {
    currentCategory: null
  }

  setCurrentCategory = (category) => {
    this.setState({currentCategory: category});
  }

  resetCurrentCategory = () => {
    this.setState({currentCategory: null});
  }

  render(){
    const imageQueue = this.state.currentCategory ? 
      <Route 
        path= '/imageQueue'
        render={() => {
          return <ImageQueue category={this.state.currentCategory}/>
        }}/> : null

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
        {imageQueue}
        <Route 
          path='/imageQueue' 
          render={() => {
            return <BackButton resetCategory={this.resetCurrentCategory}/>
          }}/>
      </div>
    );
  }

}

export default App;
