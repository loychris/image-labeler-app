import React , { Component } from 'react';
import axios from 'axios';

import classes from './Highscore.module.css';

class Highscore extends Component {
  state = {
    topUsers: []
  };


    componentDidMount = () => {
        const config = {
            headers: { 
                'Access-Control-Allow-Origin': '*',
                Authorization: `Bearer ${this.props.token}` 
            }
        }
        axios.get('http://127.0.0.1:3000/users/highscores/2', config)
        .then(res => {
            this.setState({topUsers: res.data.map((user, i) => { return {...user, ranking: i+1} })
        });
        }).catch(() => alert('Something went wrong. Try again later.'))
    }

  generateTable() {
    return this.state.topUsers.map(user => (
      <tr key={user._id}>
        <td>{user.ranking}</td>
        <td>{user.name}</td>
        <td>{user.achievements}</td>
        <td>{user.counter}</td>
      </tr>
    ));
  }

  render() {
    return (
      <main className={classes.Highscore}>
        <h1>Highscore</h1>
        <table>
          <tr>
            <th>Ranking</th>
            <th>Username</th>
            <th>Achievements</th>
            <th>Images Labeled</th>
          </tr>
          {this.generateTable()}
        </table>
      </main>
    );
  }
}

export default Highscore;
