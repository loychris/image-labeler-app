import classes from './Achievements.module.css'
import React, { Component } from 'react';
import { Col, Spinner } from 'react-bootstrap';
import AchPreview from './AchPreview/AchPreview';
import axios from 'axios';
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


import no_internet from '../no_internet.svg';


class Achievements extends Component {

    state = {
        status: 'loading',
        statistics: null,
        counter: 0,
        today: 0,
        thisWeek: 0,
        thisMonth: 0,
        thisYear: 0
    }

    componentDidMount = () => {
        if(this.state.status === 'loading'){
          const currentToken = JSON.parse(localStorage.getItem('userData')).token;
            axios({
                method: 'get',
                url: '/users/me/labeled/statistics', 
                headers: {
                    'Content-Type': 'multipart/form-data',
                    'Authorization': `Bearer ${currentToken}`
                }
            })
            .then(res => {
              this.setState({
                status: 'loaded',
                counter: res.data.counter,
                today: res.data.today,
                thisWeek: res.data.week,
                thisMonth: res.data.month,
                thisYear: res.data.year
              })
            }).catch(err => {
              this.setState({ status: 'failed' })
              console.log(err)
            })
        }
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
  
    generateNoInternetNotice() {
        return (<div> 
          <span><img src={no_internet}/></span>
          <span><br/>Sorry, something went wrong.</span>
          </div>);
    }

    generateAchievements() {
      const storedData = JSON.parse(localStorage.getItem('userData'));

      //██████████████████████████████████████████████████████████
      const doneAchievements = storedData.user.achievements; 
      console.log(doneAchievements);
      //██████████████████████████████████████████████████████████


      //Number that represents the date on which the user signed up
      const createdAt = parseInt(storedData.user.createdAt.timestamp.replace('-', '').replace('-', ''));
  
      // Number that represents the current Date -100 days
      const hundredDaysago = parseInt(moment().subtract(100, 'day').format().substr(0,10).replace('-', '').replace('-', ''))
  
      // Nuber that represents the current date
      const currentMoment = parseInt(moment().format().substr(0,10).replace('-', '').replace('-', ''))
  
      
      const achievements = [ 
          {name: 'The First of Many!' , description: 'First Image labeled',src: pic2, progress: this.state.counter > 0 ? 100 : 0},
          {name: 'Beginner' , description: '10 Images labeled',src: pic5, progress: this.state.counter > 9 ? 100 : this.state.counter/10 * 100},
          // // {name: 'Getting the hang of it' , description: '50 Images labeled',src:pic7},
          {name: 'Newcomer' , description: '100 Images labeled',src:pic7, progress: this.state.counter > 99 ? 100 : this.state.counter},
          {name: 'Mom would be proud' , description: '500 Images labeled',src:pic8, progress: this.state.counter > 499 ? 100 : this.state.counter/500 * 100},
          {name: 'You are a Winner!' , description: '1000 Images labeled',src:pic9, progress: this.state.counter > 999 ? 100 : this.state.counter/1000 * 100},
          // {name: 'Labelr' , description: '5000 Images labeled',src:pic7},
          // {name: 'Elite' , description: '10000 Images labeled',src:pic7},
          {name: 'Cyborg' , description: '20000 Images labeled',src:pic3, progress: this.state.counter > 19999 ? 100 : this.state.counter/20000 * 100},
          {name: 'Grand Master' , description: '50000 Images labeled',src:pic4, progress: this.state.counter > 49999 ? 100 : this.state.counter/50000 * 100},
          {name: 'Master of the universe' , description: '100000 Images labeled',src:pic11, progress: this.state.counter > 100000 ? 100 : this.state.counter/100000 * 100},
          // {name: 'They wont label themselfs' , description: '50 Images labeled 1 in one day',src:pic7},
          {name: 'Too Fast!' , description: '100 Images labeled 1 in one day',src:pic12, progress: this.state.counter > 99 ? 100 : this.state.counter},
          {name: 'Hustler' , description: '500 Images labeled in 1 week',src:pic19,progress: this.state.thisWeek > 499 ? 100 : this.state.thisWeek/500*100},
          {name: 'Work work work' , description: '1000 Images labeled in 1 week',src:pic15,progress:this.state.thisWeek > 999 ? 100 : this.state.thisWeek/1000*100},
          {name: 'Addict' , description: '2000 Images labeled in 1 week',src:pic10,progress:this.state.thisWeek > 1999 ? 100 : this.state.thisWeek/2000*100},
          {name: 'Hell of a week!' , description: '5000 Images labeled in 1 week',src:pic18,progress:this.state.thisWeek > 4999 ? 100 : this.state.thisWeek/5000*100},
          {name: 'Getting the hang of it' , description: '500 Images labeled in 1 month',src:pic14,progress:this.state.thisMonth > 499 ? 100 : this.state.thisMonth/500*100},
          {name: 'Elite' , description: '1000 Images labeled in 1 month',src:pic13,progress:this.state.thisMonth > 999 ? 100 : this.state.thisMonth/1000*100},
          {name: 'Explorer' , description: '2000 Images labeled in 1 month',src:pic6,progress:this.state.thisMonth > 1999 ? 100 : this.state.thisMonth/2000*100},
          {name: 'Hell of a month!' , description: '5000 Images labeled in 1 month',src:pic17,progress:this.state.thisMonth > 4999 ? 100 : this.state.thisMonth/5000*100},
          {name: 'Unstoppable Force' , description: '10000 Images labeled in 1 month',src:pic16,progress:this.state.thisMonth > 9999 ? 100 : this.state.thisMonth/10000*100},
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

      const achPreviews = achievements.map((c, i) => {
          return <AchPreview {...c} key={i}/>
      })
      return(
        <div className={classes.Flex}>{achPreviews}</div>
      )
    }

render() {


        return (
            <main >
                <h1>Your Achievements</h1>
                <hr/>
                {this.state.status === 'loading' ? this.generateSpinner() : null}
                {this.state.status === 'error' ? this.generateNoInternetNotice(): null}
                {this.state.status === 'loaded' ? this.generateAchievements() : null}
            </main>
    )

    }


}

export default Achievements;