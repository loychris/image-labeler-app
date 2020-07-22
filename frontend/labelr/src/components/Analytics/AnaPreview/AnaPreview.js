import React, { Component } from 'react';
import {ProgressBar, DropdownButton, Dropdown} from 'react-bootstrap';


import classes from './AnaPreview.module.css';

import img1 from './CategorieImages/check.png';
import img2 from './CategorieImages/download-solid.svg';


class AnaPreview extends Component {


    
    render() {
        var currentValue = 100;
        return (
            <div className={classes.anaPreview}>
                <div className={classes.thumbnail}>
                    <div className ={classes.image}> 
                        <img src={this.props.src} alt={this.props.name} className={classes.Icon}/>
                    </div>
                    <div className={classes.info}>
                        <div className={classes.caption}>{this.props.name}</div>
                        <div className={classes.description}>Uploaded: {this.props.uploaded}</div>
                        <div className={classes.description}>Deadline: {this.props.deadline}</div>
                    </div>
                    <div className={classes.progress}>
                        <div className={classes.progressLabel}>{`${currentValue}%`} complete</div>
                        {(currentValue === 100) ? (
                            <img className={classes.check} src={img1} />
                        ) : null}
                        <ProgressBar className={classes.progressBar} variant="success" now={currentValue}/>
                        {(currentValue === 100) ? (
                            <DropdownButton className={classes.download} id="download-button" title={
                                <span><i className="fas fa-download"></i>DOWNLOAD</span>
                              }>
                                <Dropdown.Item href="#/download-json">As JSON</Dropdown.Item>
                                <Dropdown.Item href="#/download-csv">As CSV</Dropdown.Item>
                            </DropdownButton>
                        ) : null}
                    </div>
                </div>
            </div>
        )
    }
}
export default AnaPreview;