import React, { Component } from 'react';
import axios from 'axios';
import { Spinner } from 'react-bootstrap';

import no_internet from '../no_internet.svg';
import AnaPreview from './AnaPreview/AnaPreview';
import classes from './Analytics.module.css';


class Analytics extends Component {


    state = {
        status: 'loading',
        imageSets: [],
        files: []
    }

  componentDidMount = () => {
    if(this.state.status === 'loading'){
      const currentToken = JSON.parse(localStorage.getItem('userData')).token;
        const config = {
          headers: { 
              'Access-Control-Allow-Origin': '*',
              Authorization: `Bearer ${currentToken}` 
            }
        }
        axios.get('http://127.0.0.1:3000/set/my', config)
        .then(res => {
          console.log(res.data);
          if(res.data){
            if(res.data.length > 0){
              const sets = res.data.map(set => {
                  console.log(set); 
                  return {
                      deadline: set.deadline.split(',')[0],
                      name: set.label,
                      src: this.imageEncode(set.icon.data),
                      uploaded: 'uploadDate',
                      progress: Math.floor(set.counter / set.goal * 100)
                  }
              })

              this.setState({ imageSets: sets, status: 'loaded' });
            }
          } 
        })
        .catch((e) => {
          this.setState({status: 'failed'})
          console.log(e);
        })
      }

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
        return <div> 
          <span><img src={no_internet}/></span>
          <span><br/>Sorry, something went wrong.</span>
          </div>;
    }

    imageEncode = (arrayBuffer) => {
      let u8 = new Uint8Array(arrayBuffer)
      let b64encoded = btoa([].reduce.call(new Uint8Array(arrayBuffer),function(p,c){return p+String.fromCharCode(c)},''))
      let mimetype="image/jpeg"
      return "data:"+mimetype+";base64,"+b64encoded
  }
    


    render() {
        const anaPreviews = this.state.imageSets.map((c, i) => {
            return (
                    <AnaPreview {...c} key={i}/>
            )
        })
        return (
            <main>
                <h1>Your Image Sets</h1>
                <hr/>
                {this.state.status === 'failed' ? this.generateNoInternetNotice() : null}
                {this.state.status === 'loading' ? this.generateSpinner() : null}
                {this.state.status === 'loaded' ? <div className={classes.Flex}>{anaPreviews}</div> : null }
            </main>
        )
    }
}

export default Analytics;