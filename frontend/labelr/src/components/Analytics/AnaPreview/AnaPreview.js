import React, { Component } from 'react';
import { ProgressBar } from 'react-bootstrap';

import classes from './AnaPreview.module.css';

import img1 from './CategorieImages/check.png';


class AnaPreview extends Component {
    
    render() {
        var now = 50;
        return (
            <div className={classes.anaPreview}>
                <div className={classes.thumbnail}>
                    <div className ={classes.image}> 
                        <img src={this.props.src} alt={this.props.name} />
                    </div>
                    <div className={classes.info}>
                        <div className={classes.caption}>{this.props.name}</div>
                        <div className={classes.description}>Uploaded: {this.props.uploaded}</div>
                        <div className={classes.description}>Deadline: {this.props.deadline}</div>
                    </div>
                    <div className={classes.progress}>
                        <div className={classes.progressLabel}>{`${now}%`} complete
                        {now = 100? (
                            <img className={classes.caption} src={img1} />
                        ) : null}
                        </div>
                        <ProgressBar className={classes.progressBar} variant="success" now={50}/>
                    </div>
                </div>
            </div>
        )
    }
}
export default AnaPreview;