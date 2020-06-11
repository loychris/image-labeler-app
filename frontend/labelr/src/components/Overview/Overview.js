import React, { Component } from 'react';
import {Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';
// import { faHome } from "@fortawesome/free-solid-svg-icons";
// import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import CatPreview from './CatPreview/CatPreview';

import classes from './Overview.module.css';




class Overview extends Component {

    state = {
        categories: [
            {name: 'Cars', route: '/cars',src:''},
            {name: 'Dogs', route: '/cat2',src:''},
            {name: 'Food', route: '/cat3',src:''},
            {name: 'Cash', route: '/cat4',src:''},
            {name: 'Humans', route: '/cat5',src:''},
            {name: 'Phones', route: '/cat6',src:''},
            {name: 'Footballs', route: '/cat7',src:''},
            {name: 'Basketballs',route: '/cat8',src:''},
            {name: 'Books', route: '/cat9',src:''},
            {name: 'Trees', route: '/cat10',src:''},
            {name: 'Cats', route: '/cat11',src:''},
            {name: 'Traffic Lights', route: '/cat12',src:'/Users/moritz/Downloads/CategoriesPics/traffic-light-solid.svg'},
            {name: 'Lamps', route: '/cat13',src:''},
            {name: 'Bridges', route: '/cat14',src:''},
            {name: 'Guitars', route: '/cat15',src:''},
            {name: 'Trains', route: '/cat16',src:''},
            {name: 'Boats', route: '/cat17',src:''},
            {name: 'Shoes', route: '/cat18',src:''},
            {name: 'Bicycle', route: '/cat19',src:''},
            {name: 'Eyes', route: '/cat20',src:''},
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