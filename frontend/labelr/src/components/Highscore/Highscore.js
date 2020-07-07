import React , { Component } from 'react';
import axios from 'axios';

import classes from './Highscore.module.css';

class Highscore extends Component {

    state = {
        scores: []
    }



    componentDidMount = () => {
        const config = {
            headers: { 
                'Access-Control-Allow-Origin': '*',
                Authorization: `Bearer ${this.props.token}` 
            }
        }
        axios.get('http://127.0.0.1:3000/users/highscores/2', config)
        .then(res => {
            this.setState({scores: res.data});
        }).catch(() => alert('Something went wrong. Try again later.'))
    }


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