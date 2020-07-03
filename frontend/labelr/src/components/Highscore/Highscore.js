import React , { Component } from 'react';
import classes from './Highscore.module.css';

class Highscore extends Component {

    render(){
        return(
            <main className={classes.Highscore}>
                <h1>Highscore</h1>
                <hr/>
            </main>
        )
    }
}

export default Highscore;