import React, { Component } from 'react';

import classes from './CatPreview.module.css';


// import img0 from './Overview/CatPreview/CategorieImages/basketball-ball-solid.svg';
// import img1 from './Overview/CatPreview/CategorieImages/bicycle-solid.svg';
// import img2 from './Overview/CatPreview/CategorieImages/book-solid.svg';
// import img3 from './Overview/CatPreview/CategorieImages/car-solid.svg';
// import img4 from './Overview/CatPreview/CategorieImages/cat-solid.svg';
// import img5 from './Overview/CatPreview/CategorieImages/dog-solid.svg';
// import img6 from './Overview/CatPreview/CategorieImages/eye-regular.svg';
// import img7 from './Overview/CatPreview/CategorieImages/football-ball-solid.svg';
// import img8 from './Overview/CatPreview/CategorieImages/guitar-solid.svg';
// import img9 from './Overview/CatPreview/CategorieImages/hamburger-solid.svg';
// import img10 from './Overview/CatPreview/CategorieImages/male-solid.svg';
// import img11 from './Overview/CatPreview/CategorieImages/mobile-alt-solid.svg';
// import img12 from './Overview/CatPreview/CategorieImages/ship-solid.svg';
// import img13 from './Overview/CatPreview/CategorieImages/shoe-prints-solid.svg';
// import img14 from './Overview/CatPreview/CategorieImages/traffic-light-solid.svg';
// import img15 from './Overview/CatPreview/CategorieImages/train-solid.svg';
// import img16 from './Overview/CatPreview/CategorieImages/tree-solid.svg';
// import img17 from './Overview/CatPreview/CategorieImages/user-solid.svg';
// import img18 from './Overview/CatPreview/CategorieImages/money-bill-alt-solid.svg';
// import img19 from './CatPreview/CategorieImages/



class CatPreview extends Component {


    render(){
        return(
            <li className={classes.catPreview}>
                <a href={`imageQueue/${this.props.name}`} className={classes.thumbnail}>
                <img src= 'https://dummyimage.com/260x200/000/fff' alt= {this.props.name} />
                </a>
            </li>
            
        )
    }
}
// https://dummyimage.com/260x200/000/fff
export default CatPreview;