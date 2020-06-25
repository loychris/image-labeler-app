import React, { Component } from 'react';

import classes from './CatPreview.module.css';


class CatPreview extends Component {


    render() {
        return (
            <div className={classes.catPreview}>
                <div className={classes.thumbnail}>
                    <img src={this.props.src} alt={this.props.name} />
                    <span className={classes.caption}>{this.props.name}</span>
                </div>
            </div>

        )
    }
}
export default CatPreview;