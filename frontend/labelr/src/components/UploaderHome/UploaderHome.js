import React, { Component } from 'react';
import classes from './UploaderHome.module.css';
import { Link } from 'react-router-dom';

import img1 from './Icons/1.png';
import img2 from './Icons/2.png';
import img3 from './Icons/3.png';
import img4 from './Icons/4.png';

class UploaderHome extends Component {
  render() {
    return (
      <main className={classes.UploaderHome}>
        <h1>Welcome</h1>
        <div className={classes.Flex}>
          <Link to='/' className={classes.Icons}>
            <img src={img1} className={classes.Images} />
            <span className={classes.caption}>upload new image set</span>
          </Link>
          <Link to='/' className={classes.Icons}>
            <img src={img2} className={classes.Images} />
            <span className={classes.caption}>monitor your image sets</span>
          </Link>
          <Link to='/' className={classes.Icons}>
            <img src={img3} className={classes.Images} />
            <span className={classes.caption}>label images</span>
          </Link>
          <Link to='/' className={classes.Icons}>
            <img src={img4} className={classes.Images} />
            <span className={classes.caption}>browse labeled image sets</span>
          </Link>
        </div>
        {/* <Link to='/categories'>Label Images</Link>
        <Link to='/highscore'>Label Images</Link>
        <Link to='/achievements'>Achievements</Link>
        <Link to='/uploadForm'>Upload Form</Link>
        <Link to='/categories'>Label Images</Link>
        <Link to='/categories'>Label Images</Link> */}
      </main>
    );
  }
}

export default UploaderHome;
