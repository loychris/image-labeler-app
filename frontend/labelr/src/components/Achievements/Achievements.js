import classes from './Achievements.module.css'
import React, { Component } from 'react';
import { Col } from 'react-bootstrap';
import AchPreview from './AchPreview/AchPreview';

import pic1 from './AchPreview/AchievementImages/trophy.png';
import pic2 from './AchPreview/AchievementImages/1st.png';
import pic3 from './AchPreview/AchievementImages/cyborg.png';
import pic4 from './AchPreview/AchievementImages/master.png';
import pic5 from './AchPreview/AchievementImages/babyyoda.png';
// import pic6 from './AchPreview/AchievementImages/week.png';

import pic7 from './AchPreview/AchievementImages/trophy bronze.svg';
import pic8 from './AchPreview/AchievementImages/trophy silver.svg';
import pic9 from './AchPreview/AchievementImages/trophy gold.svg';



class Achievements extends Component {

    state = {
        achievements: [ 
        {name: 'The First of Many!' , description: 'First Image labeled',src: pic2},
        {name: 'Beginner' , description: '10 Images labeled',src: pic5},
        {name: 'Getting the hang of it' , description: '50 Images labeled',src:pic1},
        {name: 'Newcomer' , description: '100 Images labeled',src:pic1},
        {name: 'Mom would be proud' , description: '500 Images labeled',src:pic1},
        {name: 'You are a Winner!' , description: '1000 Images labeled',src:pic1},
        {name: 'Labelr' , description: '5000 Images labeled',src:pic1},
        {name: 'Elite' , description: '10000 Images labeled',src:pic1},
        {name: 'Cyborg' , description: '20000 Images labeled',src:pic3},
        {name: 'Grand Master' , description: '50000 Images labeled',src:pic4},
        {name: 'Master of the universe' , description: '100000 Images labeled',src:pic1},
        {name: 'They wont label themselfs' , description: '50 Images labeled 1 in one day',src:pic1},
        {name: 'Too Fast!' , description: '100 Images labeled 1 in one day',src:pic1},
        {name: 'Hustler' , description: '500 Images labeled in 1 week',src:pic7},
        {name: 'Work work work' , description: '1000 Images labeled in 1 week',src:pic8},
        {name: 'Monday through sunday' , description: '2000 Images labeled in 1 week',src:pic9},
        {name: 'Hell of a week!' , description: '5000 Images labeled in 1 week',src:pic1},
        {name: 'Hell of a week!' , description: '500 Images labeled in 1 month',src:pic1},
        {name: 'Hell of a week!' , description: '1000 Images labeled in 1 month',src:pic1},
        {name: 'Hell of a week!' , description: '2000 Images labeled in 1 month',src:pic1},
        {name: 'Hell of a week!' , description: '5000 Images labeled in 1 month',src:pic1},
        {name: 'Unstoppable Force' , description: '10000 Images labeled in 1 month',src:pic1},
        {name: 'Becoming a regular' , description: '100+ Images labeled 5 Days in a row',src:pic1},
        {name: 'Strike!' , description: '100+ Images labeled 10 days in a row',src:pic1},
        {name: 'Part of my routine!' , description: '100+ Images labeled 15 days in a row',src:pic1},
        {name: 'Addict' , description: '100+ Images labeled 20 days in a row',src:pic1},
        {name: 'Can´t live without' , description: '100+ Images labeled 25 days in a row',src:pic1},
        {name: 'What even is heroin?' , description: '100+ Images labeled 30 days in a row',src:pic1},
        {name: 'Explorer' , description: '20+  Images labeled in 5 different categories',src:pic1},
        {name: 'Allrounder' , description: '100+ Images labeled in 20 different categories',src:pic1},
        {name: 'I´ve seen it all!' , description: '200+ Images labeled in 50 different categories',src:pic1},
        {name: 'A new moon!' , description: '1 month on plattform',src:pic1},
        {name: 'Back in my age..!' , description: '24 active month since signup',src:pic1},
        {name: 'Veteran' , description: '60 active month on plattform',src:pic1},
        ]
    }


//100+ Images labeled in 5 different categories
//100+ Images labeled in 10 different categories

//6 active month since signup
//12 active month since signup


render() {
    const achPreviews = this.state.achievements.map(c => {
        return (
            <Col className={classes.column} xs={4} md={3} key={c.name} align={"center"}>
                <AchPreview {...c} setCategory={this.props.setCategory} />
            </Col>
        )
    })
        return (
            <div className={classes.wrapper}>
                <div className={classes.overview}>
                    <h2>Achievements</h2>
                </div>
                <div className={classes.contentWrapper}>
                    <div className={classes.content}>
                        <div className={classes.achContent}>
                            {achPreviews}
                        </div>
                    </div>
                </div>
            </div>
    )

        }


}

export default Achievements;