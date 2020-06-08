import React, { Component } from 'react';

import classes from './CatPreview.module.css';

class CatPreview extends Component {


    render(){
        return(
            <div className={classes.catPreview} onClick={() => this.props.setCategory(this.props.name)}>
                <h3>{this.props.name}</h3>
            </div>
            
        )
    }
}

export default CatPreview;