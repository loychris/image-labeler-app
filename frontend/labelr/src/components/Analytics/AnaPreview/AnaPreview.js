import React, { Component } from 'react';
import {Button, ProgressBar } from 'react-bootstrap';


import classes from './AnaPreview.module.css';

import img1 from './CategorieImages/check.png';
import img2 from './CategorieImages/download-solid.svg';


class AnaPreview extends Component {

    
    render() {
        var currentValue = 100;
        return (
            <div className={classes.anaPreview}>
                <img src={this.props.src} alt={this.props.name} className={classes.Icon}/>
                <div className={classes.Info}>
                    <div className={classes.caption}>{this.props.name}</div>
                    <div className={classes.description}>Uploaded: {this.props.uploaded}</div>
                    <div className={classes.description}>Deadline: {this.props.deadline}</div>
                </div>
                <div className={classes.Progress}>
                    <div className={classes.progressLabel}>{`${this.props.progress}%`} complete</div>
                    {this.props.progress === 100 ? <img className={classes.check} src={img1} /> : null}
                    <ProgressBar className={classes.ProgressBar} variant="success" now={this.props.progress}/>
                    {this.props.progress === 100 ? 
                        <button className={classes.Download} onClick={() => this.onDownloadFile()}>Download Results</button>
                    : null}
                </div>
            </div>
        )
    }
}
export default AnaPreview;