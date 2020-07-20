import React, { Component } from 'react';
import classes from './Highscore.module.css';
import Spinner from 'react-bootstrap/Spinner';

class Highscore extends Component {
  state = {
    loading: true,
    loaded: false,
    failed: false,
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
    if (this.state.loaded) {
      return this.state.topUsers.map((topUsers) => (
        <tr>
          <td>{topUsers.ranking}</td>
          <td>{topUsers.username}</td>
          <td className={classes.ImagesLabeledColumn}>
            {topUsers.imagesLabeled}
          </td>
        </tr>
      ));
    }
  }

  generateSpinner() {
    if (this.state.loading) {
      return (
        <Spinner
          className={classes.Spinner}
          animation='border'
          variant='secondary'
        />
      );
    }
  }

  generateNoHighscoresNotice() {
    if (this.state.failed) {
      return <span>Sorry, no Highscores yet.</span>;
    }
  }

  render() {
    return (
      <main>
        if (loading) {}
        <h1>Highscore</h1>
        <table>
          <tr>
            <th>Ranking</th>
            <th>Username</th>
            <th className={classes.ImagesLabeledColumn}>Images Labeled</th>
          </tr>
          {this.generateSpinner()}
          {this.generateTable()}
          {this.generateNoHighscoresNotice()}
        </table>
      </main>
    );
  }
}

export default Highscore;
