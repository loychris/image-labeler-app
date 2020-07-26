import React, { Component } from "react";
import classes from './AuthTab.module.css';

class AuthTab extends Component {
    render(){
        return(
            <div 
                className={`${classes.authTab} ${this.props.active ? classes.active : classes.inactive}`}
                onClick={this.props.clicked}>
                {this.props.value}
            </div>
        )
    }
}
export default AuthTab;