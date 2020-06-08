import React, { Component } from 'react';

import classes from './CatPreview.module.css';

class CatPreview extends Component {


    render(){
        return(
            <div className={classes.catPreview}>
                <h3>{this.props.name}</h3>
            </div>
            
        )
    }
}

export default CatPreview;