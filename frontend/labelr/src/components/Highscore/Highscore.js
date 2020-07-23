import React , { Component } from 'react';
import axios from 'axios';

import classes from './Highscore.module.css';
import Spinner from 'react-bootstrap/Spinner';
import no_internet from '../no_internet.svg';

class Highscore extends Component {
  state = {
    status: 'not loaded', // 'loaded', 'loading', 'failed'
    topUsers: [],
  };


    componentDidMount = () => {
      if(this.state.status === 'not loaded'){
        const config = {
          headers: { 
              'Access-Control-Allow-Origin': '*',
              Authorization: `Bearer ${this.props.token}` 
            }
        }
        axios.get('http://127.0.0.1:3000/users/highscores/2', config)
        .then(res => {
            this.setState({
              topUsers: res.data.map((user, i) => { return {...user, ranking: i+1}}),
              status: 'loaded'
            })
        })
        .catch((e) => {
          this.setState({status: 'failed'})
          console.log(e);
        })
      }

    }

  generateTable() {
      return this.state.topUsers.map( user => (
        <tr>
          <td>{user.ranking}</td>
          <td>{user.name}</td>
          <td className={classes.ImagesLabeledColumn}>{user.achievements}</td>
          <td className={classes.ImagesLabeledColumn}>{user.counter}</td>
        </tr>
      ));
  }

  generateSpinner() {
      return (
        <Spinner
          className={classes.Spinner}
          animation='border'
          variant='secondary'
        />
      );
  }

  generateNoHighscoresNotice() {
      return <span>Sorry, no Highscores yet.</span>;
  }

  generateNoInternetNotice() {
    if (this.state.failed) {
      return <div> 
        <span><img src={no_internet}/></span>
        <span><br/>Sorry, something went wrong.</span>
        </div>;
    }
  }

  render() {
    return (
      <main>
        <h1>Highscore</h1>
        <hr/>
        <table className={classes.table}>
          <tr>
            <th>Ranking</th>
            <th>Username</th>
            <th>Achievements</th>
            <th>Images Labeled</th>
          </tr>
          {this.state.status === 'loading' ? this.generateSpinner() : null}
          {this.state.status === 'loaded' ? this.generateTable() : null}
          {this.state.status === 'failed' ? this.generateNoHighscoresNotice() : null}
        </table>
      </main>
    );
  }
}

export default Highscore;
