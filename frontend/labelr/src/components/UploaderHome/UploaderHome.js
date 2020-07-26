import React, { Component } from 'react';
import classes from './UploaderHome.module.css';
import { Link } from 'react-router-dom';

import img1 from './Icons/upload.svg';
import img2 from './Icons/monitor_sets.svg';
import img3 from './Icons/label_images.svg';
import img4 from './Icons/labeled_image_sets.svg';

class UploaderHome extends Component {
  render() {
    return (
      <main className={classes.UploaderHome}>
        <h1>Welcome</h1>
        <hr/>
        <div className={classes.Flex}>
          <Link to='/uploadForm' className={classes.Icons}>
            <img src={img1} className={classes.Images} />
            <span className={classes.caption}>upload new image set</span>
          </Link>
          <Link to='/analytics' className={classes.Icons}>
            <img src={img2} className={classes.Images} />
            <span className={classes.caption}>monitor your image sets</span>
          </Link>
          <Link to='/categories' className={classes.Icons}>
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
