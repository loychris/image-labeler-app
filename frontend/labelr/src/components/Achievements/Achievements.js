import classes from './Achievements.module.css'
import React, { Component } from 'react';
import AchPreview from './AchPreview/AchPreview';
import moment from 'moment';

import pic1 from './AchPreview/AchievementImages/moon.svg';
import pic2 from './AchPreview/AchievementImages/1st.png';
import pic3 from './AchPreview/AchievementImages/cyborg.png';
import pic4 from './AchPreview/AchievementImages/master.png';
import pic5 from './AchPreview/AchievementImages/babyyoda.png';
import pic6 from './AchPreview/AchievementImages/hat.svg';
import pic7 from './AchPreview/AchievementImages/trophy bronze.svg';
import pic8 from './AchPreview/AchievementImages/trophy silver.svg';
import pic9 from './AchPreview/AchievementImages/trophy gold.svg';
import pic10 from './AchPreview/AchievementImages/vaccine.svg'
import pic11 from './AchPreview/AchievementImages/universe.svg'
import pic12 from './AchPreview/AchievementImages/fast.svg'
import pic13 from './AchPreview/AchievementImages/crown.svg'
import pic14 from './AchPreview/AchievementImages/hang.svg'
import pic15 from './AchPreview/AchievementImages/suitcase.svg'
import pic16 from './AchPreview/AchievementImages/rocket.png'
import pic17 from './AchPreview/AchievementImages/month.png'
import pic18 from './AchPreview/AchievementImages/week.png'
import pic19 from './AchPreview/AchievementImages/hustler.svg'




class Achievements extends Component {

    state = {
        loaded: false,
    }

    // componentDidMount = () => {
    //     if(!this.state.loaded){
    //         axios({
    //             method: 'get',
    //             url: '', 
    //             data: ,
    //             headers: {
    //                 'Content-Type': 'multipart/form-data',
    //                 'Authorization': `Bearer ${currentToken}`
    //             }
    //         })
    //         .then(res => {
    //             console.log(res.data);
    //         }).catch(err => console.log(err))
    //     }
    // }


render() {

    const storedData = JSON.parse(localStorage.getItem('userData'));

    //Number that represents the date on which the user signed up
    const createdAt = parseInt(storedData.user.createdAt.timestamp.replace('-', '').replace('-', ''));

    // Number that represents the current Date -100 days
    const hundredDaysago = parseInt(moment().subtract(100, 'day').format().substr(0,10).replace('-', '').replace('-', ''))

    // Nuber that represents the current date
    const currentMoment = parseInt(moment().format().substr(0,10).replace('-', '').replace('-', ''))

    // total number of images labeled by user
    const counter = storedData.user.counter; 

    const counterThisWeek = storedData.user.counterThisWeek;

    const counterThisMonth = storedData.user.counterThisMonth;
    
    const achievements = [ 
        {name: 'The First of Many!' , description: 'First Image labeled',src: pic2, progress: counter > 0 ? 100 : 0},
        {name: 'Beginner' , description: '10 Images labeled',src: pic5, progress: counter > 9 ? 100 : counter/10 * 100},
        // // {name: 'Getting the hang of it' , description: '50 Images labeled',src:pic7},
        {name: 'Newcomer' , description: '100 Images labeled',src:pic7, progress: counter > 99 ? 100 : counter},
        {name: 'Mom would be proud' , description: '500 Images labeled',src:pic8, progress: counter > 499 ? 100 : counter/500 * 100},
        {name: 'You are a Winner!' , description: '1000 Images labeled',src:pic9, progress: counter > 999 ? 100 : counter/1000 * 100},
        // {name: 'Labelr' , description: '5000 Images labeled',src:pic7},
        // {name: 'Elite' , description: '10000 Images labeled',src:pic7},
        {name: 'Cyborg' , description: '20000 Images labeled',src:pic3, progress: counter > 19999 ? 100 : counter/20000 * 100},
        {name: 'Grand Master' , description: '50000 Images labeled',src:pic4, progress: counter > 49999 ? 100 : counter/50000 * 100},
        {name: 'Master of the universe' , description: '100000 Images labeled',src:pic11, progress: counter > 100000 ? 100 : counter/100000 * 100},
        // {name: 'They wont label themselfs' , description: '50 Images labeled 1 in one day',src:pic7},
        {name: 'Too Fast!' , description: '100 Images labeled 1 in one day',src:pic12, progress: counter > 99 ? 100 : counter},
        {name: 'Hustler' , description: '500 Images labeled in 1 week',src:pic19,progress: counterThisWeek > 499 ? 100 : counterThisWeek/500*100},
        {name: 'Work work work' , description: '1000 Images labeled in 1 week',src:pic15,progress:counterThisWeek > 999 ? 100 : counterThisWeek/1000*100},
        {name: 'Addict' , description: '2000 Images labeled in 1 week',src:pic10,progress:counterThisWeek > 1999 ? 100 : counterThisWeek/2000*100},
        {name: 'Hell of a week!' , description: '5000 Images labeled in 1 week',src:pic18,progress:counterThisWeek > 4999 ? 100 : counterThisWeek/5000*100},
        {name: 'Getting the hang of it' , description: '500 Images labeled in 1 month',src:pic14,progress:counterThisMonth > 499 ? 100 : counterThisMonth/500*100},
        {name: 'Elite' , description: '1000 Images labeled in 1 month',src:pic13,progress:counterThisMonth > 999 ? 100 : counterThisMonth/1000*100},
        {name: 'Explorer' , description: '2000 Images labeled in 1 month',src:pic6,progress:counterThisMonth > 1999 ? 100 : counterThisMonth/2000*100},
        {name: 'Hell of a month!' , description: '5000 Images labeled in 1 month',src:pic17,progress:counterThisMonth > 4999 ? 100 : counterThisMonth/5000*100},
        {name: 'Unstoppable Force' , description: '10000 Images labeled in 1 month',src:pic16,progress:counterThisMonth > 9999 ? 100 : counterThisMonth/10000*100},
        // {name: 'Becoming a regular' , description: '100+ Images labeled 5 Days in a row',src:pic7},
        // {name: 'Strike!' , description: '100+ Images labeled 10 days in a row',src:pic7},
        // {name: 'Part of my routine!' , description: '100+ Images labeled 15 days in a row',src:pic7},
        // {name: 'Can´t live without' , description: '100+ Images labeled 25 days in a row',src:pic7},
        // {name: 'What even is heroin?' , description: '100+ Images labeled 30 days in a row',src:pic10, progress: 0},
        // {name: 'Allrounder' , description: '100+ Images labeled in 20 different categories',src:pic7},
        // {name: 'I´ve seen it all!' , description: '200+ Images labeled in 50 different categories',src:pic7},
        {name: 'A new moon!' , description: '1 month on plattform',src:pic1, progress: createdAt < hundredDaysago ? 100 : 0},
        // {name: 'Back in my age..!' , description: '24 active month since signup',src:pic7},
        // {name: 'Veteran' , description: '60 active month on plattform',src:pic7},

        //100+ Images labeled in 5 different categories
        //100+ Images labeled in 10 different categories

        //6 active month since signup
        //12 active month since signup
    ]


    

    

    const achPreviews = achievements.map(c => {
        return <AchPreview {...c} />
    })

    return (
        <main >
            <h1>Your Achievements</h1>
            <hr/>
            <div className={classes.Flex}>
                {achPreviews}
            </div>
        </main>
    )

    }


}

export default Achievements;