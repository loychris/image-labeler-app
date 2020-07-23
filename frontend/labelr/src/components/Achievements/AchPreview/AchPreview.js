import React, { Component } from 'react';
import { ProgressBar } from 'react-bootstrap';

import classes from './AchPreview.module.css';


class AchPreview extends Component {
    
    render() {
        return (
            <div className={classes.achPreview}>
                <div className={classes.thumbnail}>
                    <img src={this.props.src} alt={this.props.name} />
                    <span className={classes.caption}>{this.props.name}</span>
                </div>
                <ProgressBar className={classes.progressBar} variant="success" now={this.props.progress} label={`${this.props.progress}%`} />
                <div className={classes.description}>{this.props.description}</div>
            </div>
        )
    }
}
export default AchPreview;