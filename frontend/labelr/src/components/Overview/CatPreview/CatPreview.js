import React, { Component } from 'react';

import classes from './CatPreview.module.css';


class CatPreview extends Component {


    render() {
        return (
            <div className={classes.catPreview}>
                <a className={classes.thumbnail}>
                    <img src={this.props.src} alt={this.props.name} />
                    <span className={classes.caption}>{this.props.name}</span>
                </a>
            </div>

        )
    }
}
// https://dummyimage.com/260x200/000/fff
export default CatPreview;