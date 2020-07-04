import React , { Component } from 'react';
import classes from './UploaderHome.module.css';
import { Link } from 'react-router-dom';

class UploaderHome extends Component {

    render(){
        return(
            <main className={classes.UploaderHome}>
                <h1>UploaderHome</h1>
                <hr/>
                <Link to='/categories'>Label Images</Link> 
                <Link to='/highscore'>Label Images</Link> 
                <Link to='/achievements'>Achievements</Link> 
                <Link to='/uploadForm'>Upload Form</Link> 
                <Link to='/categories'>Label Images</Link> 
                <Link to='/categories'>Label Images</Link> 
            </main>
        )
    }
}

export default UploaderHome;