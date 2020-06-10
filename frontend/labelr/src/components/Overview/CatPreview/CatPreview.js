import React, { Component } from 'react';

import classes from './CatPreview.module.css';

class CatPreview extends Component {


    render(){
        return(
            <li className={classes.catPreview}>
                <a href={`imageQueue/${this.props.name}`} className={classes.thumbnail}>
                <img src= 'https://dummyimage.com/260x200/000/fff' alt= {this.props.name} />
                </a>
            </li>
            
        )
    }
}

export default CatPreview;