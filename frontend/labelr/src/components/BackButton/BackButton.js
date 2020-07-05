import React, { Component } from 'react';

import { Link } from 'react-router-dom';

import arrow from './arrow.png';
import classes from './BackButton.module.css';

class BackButton extends Component {

    render() {
        return(
            <Link to={this.props.to}>
                <div className={classes.backButton}>
                    <img src={arrow} alt='' className={classes.backArrow}/> 
                    Back
                </div>
            </Link>
        )
    }

}

export default BackButton;