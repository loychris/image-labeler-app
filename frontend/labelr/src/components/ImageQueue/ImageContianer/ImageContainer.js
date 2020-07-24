import React, { Component } from 'react';
import classes from './ImageContainer.module.css';

import axios from 'axios';

import Spinner from 'react-bootstrap/Spinner';
import no_internet from '../../no_internet.svg';


class ImageContainer extends Component {
    state = {
        status: 'loading',
        image: null
    }


    generateSpinner() {
        return (
          <Spinner
            className={classes.Spinner}
            animation='border'
            variant='secondary'
          />
        );
    }

    generateNoInternetNotice() {
          return (<div> 
            <span><img src={no_internet}/></span>
            <span><br/>Sorry, something went wrong.</span>
            </div>);
    }

    imageEncode = (arrayBuffer) => {
      let u8 = new Uint8Array(arrayBuffer)
      let b64encoded = btoa([].reduce.call(new Uint8Array(arrayBuffer),function(p,c){return p+String.fromCharCode(c)},''))
      let mimetype="image/jpeg"
      return "data:"+mimetype+";base64,"+b64encoded
    }

    componentDidMount() {
        if (this.state.status === 'loading') {
          console.log('#####################');
          const currentToken = JSON.parse(localStorage.getItem('userData')).token;
          console.log('ID', this.props.id);
          const config = {
            headers: { 
                'Access-Control-Allow-Origin': '*',
                Authorization: `Bearer ${currentToken}` 
              }
          }
         // axios.get(`/post/${this.props.id}`).then(response => {
          axios.get(`/images/id/${this.props.id}`, config)
          .then(response => {
            this.setState({ status: 'loaded', image: this.imageEncode(response.data[0].data.data)});
          })
          .catch(e => {
            this.setState({status: 'failed'});
            console.log('********', e);
          })
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
                {this.state.status === 'loaded' ? <img className={classes.pic} src={this.state.image} alt=''/> : null }
                {this.state.status === 'loading' && this.props.queueStatus !== 'failed' ? this.generateSpinner() : null}
                {this.state.status === 'failed' || this.props.queueStatus === 'failed' ? this.generateNoInternetNotice() : null}
            </div>
        )
    }
}

export default ImageContainer;