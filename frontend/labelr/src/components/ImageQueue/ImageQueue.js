import React, { Component } from 'react';

import ImageContainer from './ImageContianer/ImageContainer';

import classes from './ImageQueue.module.css'; 

import pic0 from './DummyImages/Cars/0.png';
import pic1 from './DummyImages/Cars/1.png';
import pic2 from './DummyImages/Cars/2.png';
import pic3 from './DummyImages/Cars/3.png';
import pic4 from './DummyImages/Cars/4.png';
import pic5 from './DummyImages/Cars/5.png';
import pic6 from './DummyImages/Cars/6.png';
import pic7 from './DummyImages/Cars/7.png';
import pic8 from './DummyImages/Cars/8.png';
import pic9 from './DummyImages/Cars/9.png';

const images = [pic0, pic1, pic2, pic3, pic4, pic5, pic6, pic7, pic8, pic9];

class ImageQueue extends Component {

    state = {
        queue: [
            {pos: 0, show: 'left', id: 0, pic: pic0},
            {pos: 1, show: 'middle', id: 1, pic: pic1},
            {pos: 2, show: 'middle', id: 2, pic: pic2},
            {pos: 3, show: 'middle', id: 3, pic: pic3},
            {pos: 4, show: 'middle', id: 4, pic: pic4},
            {pos: 5, show: 'middle', id: 5, pic: pic5},
            {pos: 6, show: 'middle', id: 6, pic: pic6},
            {pos: 7, show: 'middle', id: 7, pic: pic7},
            {pos: 8, show: 'middle', id: 8, pic: pic8}, 
            {pos: 9, show: 'middle', id: 9, pic: pic9}
        ],
        nextPicId: 10,
        timeStampLastLabel: 0
    }

    componentDidMount() {
        document.addEventListener("keyup", this.keypressHandler, false);
        // TODO: fetch next ids from Server and fill state.queue
    }

    // When left-key / right-key is pressed the first image also gets labeled
    keypressHandler = (event) => {
            if (event.keyCode === 37) {
                this.labelFirst('left');
            } else if (event.keyCode === 39) {
                this.labelFirst('right');
            }
    }

    labelFirst = (direction) => {
        //TODO: send POST-req with the result to the server
        const currentTimeStamp = Date.now();
        console.log('last: ',this.state.timeStampLastLabel); 
        console.log('current: ',currentTimeStamp);
        if(currentTimeStamp - 400 > this.state.timeStampLastLabel){
            console.log(direction);
            const newQueue = this.state.queue
                .map(x => {
                    const newPos = x.pos-1;
                    const show = newPos === 0 ? direction : 'middle'
                    return ({ ...x, show, pos: newPos });
                })
                .filter(x => {return x.pos >= 0});
            newQueue.push({pos: 9, show: '', id: this.state.nextPicId, pic: images[this.state.nextPicId%10]})
            const newNextPicId = this.state.nextPicId+1;
            this.setState({
                queue: newQueue, 
                nextPicId: newNextPicId,
                timeStampLastLabel: currentTimeStamp
            });
        }
    }

    render(){
        const imageContainers = this.state.queue.map(i => {
            return <ImageContainer {...i} key={i.id}/>
        })
        return(
            <div className={classes.imageQueue}>
                <h1>{this.props.category}</h1> 
                {imageContainers}
                <div className={classes.leftButton} onClick={() => this.labelFirst("left")}>&lt;</div>
                <div className={classes.rightButton} onClick={() => this.labelFirst("right")}>&gt;</div>
            </div>
        )
    }
}

export default ImageQueue; 