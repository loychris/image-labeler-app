import React, { Component } from 'react';
import { ProgressBar } from 'react-bootstrap';

import classes from './AchPreview.module.css';


class AchPreview extends Component {
    
    render() {
        const now = 50;
        return (
            <div className={classes.achPreview}>
                <div className={classes.thumbnail}>
                    <img src={this.props.src} alt={this.props.name} />
                    <span className={classes.caption}>{this.props.name}</span>
                </div>
                <ProgressBar className={classes.progress} variant="success" now={50} label={`${now}%`} />
            </div>
        )
    }
}
export default AchPreview;