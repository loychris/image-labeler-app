import React, { Component } from 'react';
import { Link,} from 'react-router-dom';
import {ProgressBar} from 'react-bootstrap';


import classes from './CatPreview.module.css';


class CatPreview extends Component {


    render() {
        return (
            <Link className={classes.link} to={'imageQueue' + this.props.route}>
                <div className={classes.catPreview}>
                    <div className={classes.thumbnail}>
                        <img className={classes.Img} src={this.props.src} alt={this.props.name} />
                        <span className={classes.caption}>{this.props.name}</span>
                        <div className={classes.time}>{this.props.time}</div>
                    </div>
                    {/* <ProgressBar className={classes.progressBar} variant="success" now={this.props.progress} label={`${Math.floor(this.props.progress)}%`} />
                    <div className= {classes.progress}>{this.props.progress}</div> */}
                </div>
            </Link>
        )
    }
}
export default CatPreview;