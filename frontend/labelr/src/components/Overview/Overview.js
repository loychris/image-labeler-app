import React, { Component } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { Link } from 'react-router-dom';

import CatPreview from './CatPreview/CatPreview';

import classes from './Overview.module.css';


class Overview extends Component {

    state = {
        categories: [
            {name: 'Cars', route: '/cars'},
            {name: 'Categorie 2', route: '/cat2'},
            {name: 'Categorie 3', route: '/cat3'},
            {name: 'Categorie 4', route: '/cat4'},
            {name: 'Categorie 5', route: '/cat5'},
            {name: 'Categorie 6', route: '/cat6'},
            {name: 'Categorie 7', route: '/cat7'}
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
                <Container>
                    <Row>
                        {catPreviews}
                    </Row>
                </Container>
            </div>

        )
    }
}

export default Overview;