import React, { Component } from 'react';
import { Col, Spinner } from 'react-bootstrap';
import axios from 'axios';

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
import no_internet from '../no_internet.svg';

class Overview extends Component {
  state = {
    status: 'loading',
    categories: [
        { name: 'Basketballs', route: '/cat1', src: img0,progress:'430/500 images labeled' , time:'3 days left' },
        { name: 'Bicycle', route: '/cat2', src: img1,progress:'430/500 images labeled' , time:'3 days left' },
        { name: 'Books', route: '/cat3', src: img2,progress:'430/500 images labeled' , time:'3 days left' },
        { name: 'Cars', route: '/cat4', src: img3,progress:'430/500 images labeled' , time:'3 days left' },
        { name: 'Cats', route: '/cat5', src: img4,progress:'430/500 images labeled' , time:'3 days left' },
        { name: 'Dogs', route: '/cat6', src: img5,progress:'430/500 images labeled' , time:'3 days left' },
        { name: 'Eyes', route: '/cat7', src: img6,progress:'430/500 images labeled' , time:'3 days left' },
        { name: 'Footballs', route: '/cat8', src: img7,progress:'430/500 images labeled' , time:'3 days left' },
        { name: 'Guitars', route: '/cat9', src: img8,progress:'430/500 images labeled' , time:'3 days left' },
        { name: 'Food', route: '/cat10', src: img9,progress:'430/500 images labeled' , time:'3 days left' },
        { name: 'Bridges', route: '/cat11', src: img10,progress:'430/500 images labeled' , time:'3 days left' },
        { name: 'Phones', route: '/cat12', src: img11,progress:'430/500 images labeled' , time:'3 days left' },
        { name: 'Boats', route: '/cat13', src: img12,progress:'430/500 images labeled' , time:'3 days left' },
        { name: 'Shoes', route: '/cat14', src: img13,progress:'430/500 images labeled' , time:'3 days left' },
        { name: 'Traffic Lights', route: '/cat15', src: img14,progress:'430/500 images labeled' , time:'3 days left' },
        { name: 'Trains', route: '/cat16', src: img15,progress:'430/500 images labeled' , time:'3 days left' },
        { name: 'Trees', route: '/cat17', src: img16,progress:'430/500 images labeled' , time:'3 days left' },
        { name: 'Humans', route: '/cat18', src: img17,progress:'430/500 images labeled' , time:'3 days left' },
        { name: 'Cash', route: '/cat19', src: img18,progress:'430/500 images labeled' , time:'3 days left' },
        { name: 'Lamps', route: '/cat20', src: img19,progress:'430/500 images labeled' , time:'3 days left' },
    ]
}

componentDidMount() {
  if(this.state.status === 'loading' && localStorage.getItem('userData')){
    const currentToken = JSON.parse(localStorage.getItem('userData')).token;
    const config = {
      headers: { 
          'Access-Control-Allow-Origin': '*',
          Authorization: `Bearer ${currentToken}` 
        }
    }
    axios.get('http://127.0.0.1:3000/set/', config)
    .then(res => {
      console.log(res.data);
      if(res.data){
        if(res.data.length > 0){
          const sets = res.data.map(set => {
              return {
                  time: set.deadline.split(',')[0],
                  name: set.label,
                  route: `/${set.label}/${set._id}`,
                  src: this.imageEncode(set.icon.data),
                  progress: set.counter / set.goal * 100
              }
          })
          this.setState({ categories: sets, status: 'loaded' });
        }
      } 
    })
    .catch((e) => {
      this.setState({status: 'failed'})
      console.log(e);
    })
  }

}

imageEncode = (arrayBuffer) => {
  let u8 = new Uint8Array(arrayBuffer)
  let b64encoded = btoa([].reduce.call(new Uint8Array(arrayBuffer),function(p,c){return p+String.fromCharCode(c)},''))
  let mimetype="image/jpeg"
  return "data:"+mimetype+";base64,"+b64encoded
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

  generateFailureNotice() {
      return <span>Sorry, something went wrong.</span>
  }

  
  generateNoInternetNotice() {
    if (this.state.failed) {
      return <div> 
        <span><img src={no_internet}/></span>
        <span><br/>Sorry, something went wrong.</span>
        </div>;
    }
  }

    


  render() {
    const catPreviews = this.state.categories.map((c, i) => {
      return <CatPreview {...c} key={i}/>;
    });
    return (
      <main>
        <h1>Select a Categorie</h1>
        <hr />
        {this.state.status === 'loading' ? this.generateSpinner() : null}
        {this.state.status === 'failed' ? this.generateFailureNotice() : null }
        {this.state.status === 'loaded' ? <div className={classes.Flex}>{catPreviews}</div> : null}        
      </main>
    );
  }
}

export default Overview;
