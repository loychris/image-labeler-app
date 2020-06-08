import React, { Component } from 'react';
import classes from './ImageQueue.module.css'; 

class ImageQueue extends Component {

    state = {

    }

    render(){
        return(
            <div className='imageQueue'>
                <h1>{this.props.category}</h1>
            </div>
        )
    }
}

export default ImageQueue; 