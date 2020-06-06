import React, { Component } from "react";
import classes from './AuthTab.module.css';

class AuthTab extends Component {
    render(){
        let styleClasses = [classes.authTab];
        if(this.props.active){ 
            styleClasses.push(classes.active); 
        } else {
            styleClasses.push(classes.inactive);
        }

        return(
            <div 
                className={styleClasses.join(' ')}
                onClick={this.props.clicked}>
                {this.props.value}
            </div>
        )
    }
}
export default AuthTab;