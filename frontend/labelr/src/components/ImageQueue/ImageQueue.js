import React, { Component } from 'react';
import { Link } from 'react-router-dom';

import ImageContainer from './ImageContianer/ImageContainer';


import classes from './ImageQueue.module.css'; 
import arrow from './arrow.png';
import arrowright from './arrowright.png';


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

    getButtonBackgroundSVG = (dir) => {
        return(
            dir === 'right' ? 
            <svg 
                className={classes.rightButtonBackgorund}
                width="142" height="192" viewBox="0 0 142 192" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g filter="url(#filter0_dd)">
                <path d="M12 71C12 38.4152 38.4152 12 71 12C103.585 12 130 38.4152 130 71C130 103.585 103.585 130 71 130C38.4152 130 12 103.585 12 71Z" fill="#F5F5F5"/>
                <path d="M13 137C13 125.954 21.9543 117 33 117H109C120.046 117 129 125.954 129 137V160C129 171.046 120.046 180 109 180H33C21.9543 180 13 171.046 13 160V137Z" fill="#F5F5F5"/>
                </g>
                <path d="M67.6484 161H63.8789L49.5625 139.086V161H45.793V132.562H49.5625L63.918 154.574V132.562H67.6484V161ZM96.1836 147.699C96.1836 150.486 95.7148 152.921 94.7773 155.004C93.8398 157.074 92.5117 158.656 90.793 159.75C89.0742 160.844 87.069 161.391 84.7773 161.391C82.5378 161.391 80.5521 160.844 78.8203 159.75C77.0885 158.643 75.7409 157.074 74.7773 155.043C73.8268 152.999 73.3385 150.635 73.3125 147.953V145.902C73.3125 143.168 73.7878 140.753 74.7383 138.656C75.6888 136.56 77.0299 134.958 78.7617 133.852C80.5065 132.732 82.4987 132.172 84.7383 132.172C87.0169 132.172 89.0221 132.725 90.7539 133.832C92.4987 134.926 93.8398 136.521 94.7773 138.617C95.7148 140.701 96.1836 143.129 96.1836 145.902V147.699ZM92.4531 145.863C92.4531 142.491 91.776 139.906 90.4219 138.109C89.0677 136.299 87.1732 135.395 84.7383 135.395C82.3685 135.395 80.5 136.299 79.1328 138.109C77.7786 139.906 77.082 142.406 77.043 145.609V147.699C77.043 150.967 77.7266 153.539 79.0938 155.414C80.474 157.276 82.3685 158.207 84.7773 158.207C87.1992 158.207 89.0742 157.328 90.4023 155.57C91.7305 153.799 92.4141 151.267 92.4531 147.973V145.863Z" fill="#413E4D"/>
                <path d="M55.8069 98.1L61.8144 104L95.1932 71L61.7807 38L55.8069 43.9L83.2457 71L55.8069 98.1Z" fill="#413E4D"/>
                <defs>
                <filter id="filter0_dd" x="0" y="0" width="142" height="192" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
                <feFlood flood-opacity="0" result="BackgroundImageFix"/>
                <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"/>
                <feOffset dx="-6" dy="-6"/>
                <feGaussianBlur stdDeviation="3"/>
                <feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 1 0"/>
                <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow"/>
                <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"/>
                <feOffset dx="6" dy="6"/>
                <feGaussianBlur stdDeviation="3"/>
                <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"/>
                <feBlend mode="normal" in2="effect1_dropShadow" result="effect2_dropShadow"/>
                <feBlend mode="normal" in="SourceGraphic" in2="effect2_dropShadow" result="shape"/>
                </filter>
                </defs>
            </svg> : 
            <svg 
                className={classes.leftButtonBackgorund}
                width="142" height="192" viewBox="0 0 142 192" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g filter="url(#filter0_dd)">
                <path d="M12 71C12 38.4152 38.4152 12 71 12C103.585 12 130 38.4152 130 71C130 103.585 103.585 130 71 130C38.4152 130 12 103.585 12 71Z" fill="#F5F5F5"/>
                <path d="M13 137C13 125.954 21.9543 117 33 117H109C120.046 117 129 125.954 129 137V160C129 171.046 120.046 180 109 180H33C21.9543 180 13 171.046 13 160V137Z" fill="#F5F5F5"/>
                </g>
                <path d="M47.2188 146.84L54.6406 132.562H58.8984L49.0938 150.395V161H45.3438V150.395L35.5391 132.562H39.8359L47.2188 146.84ZM78.6445 147.855H66.3203V157.934H80.6367V161H62.5703V132.562H80.4414V135.648H66.3203V144.789H78.6445V147.855ZM93.6836 148.324C90.4674 147.4 88.1237 146.267 86.6523 144.926C85.194 143.572 84.4648 141.905 84.4648 139.926C84.4648 137.686 85.3568 135.837 87.1406 134.379C88.9375 132.908 91.2682 132.172 94.1328 132.172C96.0859 132.172 97.8242 132.549 99.3477 133.305C100.884 134.06 102.069 135.102 102.902 136.43C103.749 137.758 104.172 139.21 104.172 140.785H100.402C100.402 139.066 99.8555 137.719 98.7617 136.742C97.668 135.753 96.125 135.258 94.1328 135.258C92.2839 135.258 90.8385 135.668 89.7969 136.488C88.7682 137.296 88.2539 138.422 88.2539 139.867C88.2539 141.026 88.7422 142.009 89.7188 142.816C90.7083 143.611 92.3815 144.34 94.7383 145.004C97.1081 145.668 98.957 146.404 100.285 147.211C101.626 148.005 102.616 148.936 103.254 150.004C103.905 151.072 104.23 152.328 104.23 153.773C104.23 156.078 103.332 157.927 101.535 159.32C99.7383 160.701 97.3359 161.391 94.3281 161.391C92.375 161.391 90.5521 161.02 88.8594 160.277C87.1667 159.522 85.8581 158.493 84.9336 157.191C84.0221 155.889 83.5664 154.411 83.5664 152.758H87.3359C87.3359 154.477 87.9674 155.837 89.2305 156.84C90.5065 157.829 92.2057 158.324 94.3281 158.324C96.3073 158.324 97.8242 157.921 98.8789 157.113C99.9336 156.306 100.461 155.206 100.461 153.812C100.461 152.419 99.9727 151.345 98.9961 150.59C98.0195 149.822 96.2487 149.066 93.6836 148.324Z" fill="#413E4D"/>
                <path d="M84.1931 43.9L78.1856 38L44.8068 71L78.2193 104L84.1931 98.1L56.7543 71L84.1931 43.9Z" fill="#413E4D"/>
                <defs>
                <filter id="filter0_dd" x="0" y="0" width="142" height="192" filterUnits="userSpaceOnUse" color-interpolation-filters="sRGB">
                <feFlood flood-opacity="0" result="BackgroundImageFix"/>
                <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"/>
                <feOffset dx="-6" dy="-6"/>
                <feGaussianBlur stdDeviation="3"/>
                <feColorMatrix type="matrix" values="0 0 0 0 1 0 0 0 0 1 0 0 0 0 1 0 0 0 1 0"/>
                <feBlend mode="normal" in2="BackgroundImageFix" result="effect1_dropShadow"/>
                <feColorMatrix in="SourceAlpha" type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"/>
                <feOffset dx="6" dy="6"/>
                <feGaussianBlur stdDeviation="3"/>
                <feColorMatrix type="matrix" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"/>
                <feBlend mode="normal" in2="effect1_dropShadow" result="effect2_dropShadow"/>
                <feBlend mode="normal" in="SourceGraphic" in2="effect2_dropShadow" result="shape"/>
                </filter>
                </defs>
            </svg>
        )
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
        const leftButtonClasses = [classes.leftButton, classes.button]
        const rightButtonClasses = [classes.rightButton, classes.button]

        return(
            <div className={classes.imageQueue}>
                <Link to='/'>
                    <div className={classes.backButton}>
                        <img src={arrow} alt='' className={classes.backArrow}/> 
                        Back
                    </div>
                </Link>
                <h1>Is there a <strong>Car</strong> in this picture?</h1> 
                {imageContainers}
                <div 
                    className={leftButtonClasses.join(' ')} 
                    onClick={() => this.labelFirst("left")}>
                    {this.getButtonBackgroundSVG('left')}
                    <div className={classes.mobileYesButton}>
                        <img src={arrow} alt='' className={classes.arrowLeft}/> 
                        <span className={classes.yes}>YES</span>
                    </div>
                </div>
                <div 
                    className={rightButtonClasses.join(' ')} 
                    onClick={() => this.labelFirst("right")}>
                    {this.getButtonBackgroundSVG('right')}
                    <div className={classes.mobileNoButton}>
                        <img src={arrowright} alt='' className={classes.arrowRight}/> 
                        <span className={classes.no}>NO</span>
                    </div>
                </div> 
            </div>
        )
    }
}

export default ImageQueue; 