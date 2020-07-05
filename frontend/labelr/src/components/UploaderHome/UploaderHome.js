import React, { Component } from 'react';
import classes from './UploaderHome.module.css';
import { Link } from 'react-router-dom';

import img0 from './Icons/cloud_upload_24px_outlined.svg';
import img1 from './Icons/insert_chart_24px_outlined.svg';
import img2 from './Icons/filter_24px_outlined.svg';

class UploaderHome extends Component {
  render() {
    return (
      <main className={classes.UploaderHome}>
        <h1>Welcome</h1>
        <div className={classes.Flex}>
          <Link to='/' className={classes.Icons}>
            <img src={img0} />
            <span className={classes.caption}>upload new image set</span>
          </Link>
          <Link to='/' className={classes.Icons}>
            <img src={img1} />
            <span className={classes.caption}>monitor your image sets</span>
          </Link>
          <Link to='/' className={classes.Icons}>
            <img src={img2} />
            <span className={classes.caption}>label images</span>
          </Link>
          <Link to='/' className={classes.Icons}>
            <img src={img2} />
            <span className={classes.caption}>browse labeled image sets</span>
          </Link>
        </div>

        <hr />
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
