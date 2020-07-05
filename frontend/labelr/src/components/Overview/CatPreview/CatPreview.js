import React, { Component } from 'react';
import { Link } from 'react-router-dom';


import classes from './CatPreview.module.css';


class CatPreview extends Component {


    render() {
        return (
            <Link to={'imageQueue/' + this.props.name}>
                <div className={classes.catPreview}>
                    <div className={classes.thumbnail}>
                        <img className={classes.Img} src={this.props.src} alt={this.props.name} />
                        <span className={classes.caption}>{this.props.name}</span>
                    </div>
                </div>
            </Link>
        )
    }
}
export default CatPreview;