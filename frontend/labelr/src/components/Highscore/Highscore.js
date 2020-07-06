import React, { Component } from 'react';
import classes from './Highscore.module.css';

class Highscore extends Component {
  state = {
    topUsers: [
      {
        ranking: 1,
        username: 'Martin',
        imagesLabeled: 1100,
        completedCategories: 36,
      },
      {
        ranking: 2,
        username: 'Chris',
        imagesLabeled: 2200,
        completedCategories: 13,
      },
      {
        ranking: 3,
        username: 'Tamir',
        imagesLabeled: 5500,
        completedCategories: 21,
      },
      {
        ranking: 4,
        username: 'Pascal',
        imagesLabeled: 9000,
        completedCategories: 110,
      },
      {
        ranking: 5,
        username: 'Antonia',
        imagesLabeled: 15500,
        completedCategories: 10,
      },
      {
        ranking: 6,
        username: 'Moritz',
        imagesLabeled: 15500,
        completedCategories: 10,
      },
      {
        ranking: 7,
        username: 'Marcus',
        imagesLabeled: 3210,
        completedCategories: 12,
      },
    ],
  };

  generateTable() {
    return this.state.topUsers.map((topUsers) => (
      <tr>
        <td>{topUsers.ranking}</td>
        <td>{topUsers.username}</td>
        <td>{topUsers.completedCategories}</td>
        <td>{topUsers.imagesLabeled}</td>
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
            <th>Completed Categories</th>
            <th>Images Labeled</th>
          </tr>
          {this.generateTable()}
        </table>
      </main>
    );
  }
}

export default Highscore;
