import React, { Component } from 'react';
import classes from './ImageContainer.module.css';



class ImageContainer extends Component {


    render(){

        const styleClasses = [classes.imageContainer];
        if(this.props.show === 'left'){
            styleClasses.push(classes.hiddenLeft);
        }else if(this.props.show === 'right'){
            styleClasses.push(classes.hiddenRight);
        }
        if(this.props.pos > 1){
            styleClasses.push(classes.moveBack);
        }

        const inlineStyles = {zIndex: 10-this.props.pos}

        return(
            <div style={inlineStyles} className={styleClasses.join(' ')}>
                <p>show: {this.props.show}</p>
                <p>id: {this.props.id}</p>
                <img className={classes.pic} src={this.props.pic} alt=''/>
            </div>
        )
    }
}

export default ImageContainer;