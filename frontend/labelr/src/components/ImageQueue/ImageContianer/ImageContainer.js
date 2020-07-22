import React, { Component } from 'react';
import classes from './ImageContainer.module.css';
import Spinner from 'react-bootstrap/Spinner';
import no_internet from '../../no_internet.svg';


class ImageContainer extends Component {
    state = {
        loading: true,
        loaded: false,
        failed: true,
    }

    generateSpinner() {
        if (this.state.loading) {
          return (
            <Spinner
              className={classes.Spinner}
              animation='border'
              variant='secondary'
            />
          );
        }
    }

    generateNoInternetNotice() {
        if (this.state.failed) {
          return <div> 
            <span><img src={no_internet}/></span>
            <span><br/>Sorry, something went wrong.</span>
            </div>;
        }
    }


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
                <img className={classes.pic} src={this.props.pic} alt=''/>
                {this.generateSpinner()}
                {this.generateNoInternetNotice()}
            </div>
        )
    }
}

export default ImageContainer;