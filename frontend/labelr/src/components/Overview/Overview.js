import React, { Component } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import CatPreview from './CatPreview/CatPreview';

import classes from './Overview.module.css';

import img0 from './CatPreview/CategorieImages/basketball.png';
import img1 from './CatPreview/CategorieImages/bicycle.png';
import img2 from './CatPreview/CategorieImages/book.png';
import img3 from './CatPreview/CategorieImages/car.png';
import img4 from './CatPreview/CategorieImages/cat.png';
import img5 from './CatPreview/CategorieImages/dog.png';
import img6 from './CatPreview/CategorieImages/eye.png';
import img7 from './CatPreview/CategorieImages/football.png';
import img8 from './CatPreview/CategorieImages/guitar.png';
import img9 from './CatPreview/CategorieImages/food.png';
import img10 from './CatPreview/CategorieImages/bridge.png';
import img11 from './CatPreview/CategorieImages/phone.png';
import img12 from './CatPreview/CategorieImages/boat.png';
import img13 from './CatPreview/CategorieImages/shoe.png';
import img14 from './CatPreview/CategorieImages/traffic-light.png';
import img15 from './CatPreview/CategorieImages/train.png';
import img16 from './CatPreview/CategorieImages/tree.png';
import img17 from './CatPreview/CategorieImages/human.png';
import img18 from './CatPreview/CategorieImages/money.png';
import img19 from './CatPreview/CategorieImages/lamp.png';



class Overview extends Component {

    state = {
        categories: [
            { name: 'Basketballs', route: '/cat1', src: img0 },
            { name: 'Bicycle', route: '/cat2', src: img1 },
            { name: 'Books', route: '/cat3', src: img2 },
            { name: 'Cars', route: '/cat4', src: img3 },
            { name: 'Cats', route: '/cat5', src: img4 },
            { name: 'Dogs', route: '/cat6', src: img5 },
            { name: 'Eyes', route: '/cat7', src: img6 },
            { name: 'Footballs', route: '/cat8', src: img7 },
            { name: 'Guitars', route: '/cat9', src: img8 },
            { name: 'Food', route: '/cat10', src: img9 },
            { name: 'Bridges', route: '/cat11', src: img10 },
            { name: 'Phones', route: '/cat12', src: img11 },
            { name: 'Boats', route: '/cat13', src: img12 },
            { name: 'Shoes', route: '/cat14', src: img13 },
            { name: 'Traffic Lights', route: '/cat15', src: img14 },
            { name: 'Trains', route: '/cat16', src: img15 },
            { name: 'Trees', route: '/cat17', src: img16 },
            { name: 'Humans', route: '/cat18', src: img17 },
            { name: 'Cash', route: '/cat19', src: img18 },
            { name: 'Lamps', route: '/cat20', src: img19 },
        ]
    }

    catCount = Math.ceil((this.state.categories.length / 4));


    render() {
        const catPreviews = this.state.categories.map(c => {
            return (
                <Col xs={4} md={3} key={c.name}>
                    <Link to={`imageQueue/${c.name}`}>
                        <CatPreview {...c} setCategory={this.props.setCategory} />
                    </Link>
                </Col>
            )
        })




        return (
            <div className={classes.wrapper}>
                <div className={classes.overview}>
                    <h2>Select a Categorie</h2>
                </div>
                <div className={classes.contentWrapper}>
                    <div className={classes.content}>
                        {/* <Container>
                            <Row>
                                <Col sm={3} ></Col>
                                <Col sm={3} ></Col>
                                <Col sm={3} ></Col>
                                <Col sm={3} ></Col> */}
                                {catPreviews}
                            {/* </Row>
                        </Container> */}
                    </div>
                </div>
            </div>
        )
    }
}

export default Overview;