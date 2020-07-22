import React, { Component } from 'react';
import axios from 'axios';

import AnaPreview from './AnaPreview/AnaPreview';

import classes from './Analytics.module.css';

import img1 from './AnaPreview/CategorieImages/car.png';
import img2 from './AnaPreview/CategorieImages/dog.png';
import img3 from './AnaPreview/CategorieImages/bridge.png';
import img4 from './AnaPreview/CategorieImages/traffic-light.png';

class Analytics extends Component {

    

    state = {
        status: 'not loaded',
        imageSets: []
    }

    toBase64(arr) {
      return btoa(
         arr.reduce((data, byte) => data + String.fromCharCode(byte), '')
      );
   }
    
    componentDidMount = () => {
        const currentToken = JSON.parse(localStorage.getItem('userData')).token;
        if(this.state.status === 'not loaded'){
          const config = {
            headers: { 
                'Access-Control-Allow-Origin': '*',
                Authorization: `Bearer ${currentToken}` 
              }
          }
          axios.get('http://127.0.0.1:3000/set/my', config)
          .then(res => {
            if(res.data && res.data.length > 0){
              const sets = res.data.map(set => {
                  const image = btoa(String.fromCharCode.apply(null, set.icon.data));
                  return {
                      deadline: set.deadline.split(',')[0],
                      src: "data:image/png;base64," + image,
                      name: set.label,
                      uploaded: 'uploadDate'
                  }
              })
              this.setState({
                imageSets: sets,
                status: 'loaded'
              })
            } else {
                console.log('no sets sent')
            }
          })
          .catch((e) => {
            this.setState({status: 'failed'})
            console.log(e);
          })
        }
  
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
                <div className={classes.Flex}>
                    {anaPreviews}
                </div>
            </main>
        )
    }
}

export default Analytics;