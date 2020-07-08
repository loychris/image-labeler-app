import React, { Component } from 'react';
import classes from './ImageContainer.module.css';

import axios from 'axios';



class ImageContainer extends Component {

    state = {
        imageLoaded: false,
        image: null
    }

    componentDidMount() {
        if (!this.state.postLoaded) {
          axios.get(`/post/${this.props.id}`).then(response => {
            this.setState({ imageLoaded: true, image: response.data });
          });
        }
      }


    render(){


        // Styles
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
        ///////////

        return(
            <div style={inlineStyles} className={styleClasses.join(' ')}>
                {this.state.imageLoaded ? <img className={classes.pic} src={this.state.image} alt=''/> : "spinner"}
            </div>
        )
    }
}

export default ImageContainer;