import React, { Component } from 'react';
import classes from './BackButton.module.css';
import { Link } from 'react-router-dom';

class BackButton extends Component {


    render(){
        return(
            <Link to='/'>
                <div className={classes.backButton}>
                    <h3>Back</h3>
                </div>
            </Link>
        )
    }
}

export default BackButton;