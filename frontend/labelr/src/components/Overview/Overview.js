import React, { Component } from 'react';
import {Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import CatPreview from './CatPreview/CatPreview';


import classes from './Overview.module.css';

import img0 from './CategorieImages/basketball-ball-solid.svg';
import img1 from './CategorieImages/bicycle-solid.svg';
import img2 from './CategorieImages/book-solid.svg';
import img3 from './CategorieImages/car-solid.svg';
import img4 from './CategorieImages/cat-solid.svg';
import img5 from './CategorieImages/dog-solid.svg';
import img6 from './CategorieImages/eye-regular.svg';
import img7 from './CategorieImages/football-ball-solid.svg';
import img8 from './CategorieImages/guitar-solid.svg';
import img9 from './CategorieImages/hamburger-solid.svg';
import img10 from './CategorieImages/bridge.png';
import img11 from './CategorieImages/mobile-alt-solid.svg';
import img12 from './CategorieImages/ship-solid.svg';
import img13 from './CategorieImages/shoe-prints-solid.svg';
import img14 from './CategorieImages/traffic-light-solid.svg';
import img15 from './CategorieImages/train-solid.svg';
import img16 from './CategorieImages/tree-solid.svg';
import img17 from './CategorieImages/user-solid.svg';
import img18 from './CategorieImages/money-bill-alt-solid.svg';
import img19 from './CategorieImages/lamp.png';



class Overview extends Component {

    state = {
        categories: [
            {name: 'Basketballs',route: '/cat1',src:img0},
            {name: 'Bicycle', route: '/cat2',src:img1},
            {name: 'Books', route: '/cat3',src:img2},
            {name: 'Cars', route: '/cat4',src: img3},
            {name: 'Cats', route: '/cat5',src:img4},
            {name: 'Dogs', route: '/cat6',src:img5},
            {name: 'Eyes', route: '/cat7',src:img6},
            {name: 'Footballs', route: '/cat8',src:img7},
            {name: 'Guitars', route: '/cat9',src:img8},
            {name: 'Food', route: '/cat10',src:img9},
            {name: 'Bridges', route: '/cat11',src:img10},
            {name: 'Phones', route: '/cat12',src:img11},
            {name: 'Boats', route: '/cat13,src:img12'},
            {name: 'Shoes', route: '/cat14',src:img13},
            {name: 'Traffic Lights', route: '/cat15',src:img14},
            {name: 'Trains', route: '/cat16',src:img15},
            {name: 'Trees', route: '/cat17',src:img16},
            {name: 'Humans', route: '/cat18',src:img17},
            {name: 'Cash', route: '/cat19',src:img18},
            {name: 'Lamps', route: '/cat20',src:img19},
        ]
    }
    


    render() {

        const catPreviews = this.state.categories.map(c => {
            return(
                <Col xs={4} md={3} key={c.name}>
                    <Link to={`imageQueue/${c.name}`}>
                        <CatPreview {...c} setCategory={this.props.setCategory}/>
                    </Link>
                </Col>
            )
        })


        
        
        return(
            <div className={classes.overview}>
                <h2>Categories</h2>
                    <ul className={classes.thumbnails}>
                <Container className={classes.container}>
                    {catPreviews}
                </Container>
                </ul>
            </div>
        )
    }
}

export default Overview;