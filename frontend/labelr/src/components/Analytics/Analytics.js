import React, { Component } from 'react';
import { Col } from 'react-bootstrap';

import AnaPreview from './AnaPreview/AnaPreview';

import classes from './Analytics.module.css';

import img1 from './AnaPreview/CategorieImages/car.png';
import img2 from './AnaPreview/CategorieImages/dog.png';
import img3 from './AnaPreview/CategorieImages/bridge.png';
import img4 from './AnaPreview/CategorieImages/traffic-light.png';

class Analytics extends Component {

    state = {
        imageSets: [
           {name: 'Cars', uploaded:'01.04.2020' , deadline: '31.05.2020' , src: img1},
           {name: 'Dogs', uploaded:'01.04.2020' , deadline:'31.05.2020'  , src: img2},
           {name: 'Bridges', uploaded:'01.04.2020' , deadline: '31.05.2020' , src: img3},
           {name: 'Traffic Lights', uploaded:'01.04.2020' , deadline:'31.05.2020'  , src: img4},
        ]
    }
    
    render() {
        const anaPreviews = this.state.imageSets.map(c => {
            return (
                    <AnaPreview {...c} />
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