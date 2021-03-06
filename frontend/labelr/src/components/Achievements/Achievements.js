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
import pic20 from './AchPreview/AchievementImages/mountain.svg'
import pic21 from './AchPreview/AchievementImages/bowling.svg'
import pic22 from './AchPreview/AchievementImages/year.svg'
import pic23 from './AchPreview/AchievementImages/party.svg'

import no_internet from '../no_internet.svg';


class Achievements extends Component {

    state = {
        status: 'loading',
        counter: 0,
        today: 0,
        thisWeek: 0,
        thisMonth: 0,
        thisYear: 0
    }

    componentDidMount = () => {
        if(this.state.status === 'loading'){
          const currentToken = JSON.parse(localStorage.getItem('userData')).token;
          const config = {
            headers: { 
                'Access-Control-Allow-Origin': '*',
                Authorization: `Bearer ${currentToken}` 
              }
          }
          const request1 = axios.get('http://127.0.0.1:3000/users/me/labeled/statistics', config);
          const request2 = axios.get('http://127.0.0.1:3000/users/me/profile', config);
          axios.all([request1, request2])
          .then(
            axios.spread((...responses) => {
              const response1 = responses[0];
              const response2 = responses[1]
              console.log('1', response1.data);
              console.log('2', response2.data);
              this.setState({
                status: 'loaded',
                counter: response1.data.counter,
                today: response1.data.today,
                thisWeek: response1.data.week,
                thisMonth: response1.data.month,
                thisYear: response1.data.year,
                user: response2.data
              })
            })
          ).catch(err => {
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

      //██████████████████████████████████████████████████████████
      const doneAchievements = this.state.user.achievements; 
      console.log(doneAchievements);
      //██████████████████████████████████████████████████████████


      //Number that represents the date on which the user signed up
      const createdAt = parseInt(this.state.user.createdAt.timestamp.replace('-', '').replace('-', ''));
  
      // Number that represents the current Date -100 days
      const hundredDaysago = parseInt(moment().subtract(100, 'day').format().substr(0,10).replace('-', '').replace('-', ''))
      
      //Number that represents the current Date -365 days
      const oneYear = parseInt(moment().subtract(365, 'day').format().substr(0,10).replace('-', '').replace('-', ''))

      //Number that represents the current Date -730 days
      const twoYears = parseInt(moment().subtract(730, 'day').format().substr(0,10).replace('-', '').replace('-', ''))
     
      // Number that represents the current date
      const currentMoment = parseInt(moment().format().substr(0,10).replace('-', '').replace('-', ''))
  
      
      const achievements = [ 
            {name: 'The First of Many!' , description: 'First Image labeled',src: pic2, progress: this.state.counter > 0 ? 100 : 0},
            {name: 'Beginner' , description: '10 Images labeled',src: pic5, progress: this.state.counter > 9 ? 100 : this.state.counter/10 * 100},
            {name: 'Newcomer' , description: '100 Images labeled',src:pic7, progress: this.state.counter > 99 ? 100 : this.state.counter},
            {name: 'Mom would be proud' , description: '500 Images labeled',src:pic8, progress: this.state.counter > 499 ? 100 : this.state.counter/500 * 100},
            {name: 'You are a Winner!' , description: '1000 Images labeled',src:pic9, progress: this.state.counter > 999 ? 100 : this.state.counter/1000 * 100},
            {name: 'Strike!' , description: '5000 Images labeled',src:pic21,progress: this.state.counter > 4999 ? 100 : this.state.counter/1000 * 100},
            {name: 'Grand Master' , description: '10000 Images labeled',src:pic4,progress: this.state.counter > 9999 ? 100 : this.state.counter/1000 * 100},
            {name: 'Cyborg' , description: '20000 Images labeled',src:pic3, progress: this.state.counter > 19999 ? 100 : this.state.counter/20000 * 100},
            {name: 'At the top' , description: '50000 Images labeled',src:pic20, progress: this.state.counter > 49999 ? 100 : this.state.counter/50000 * 100},
            {name: 'Master of the universe' , description: '100000 Images labeled',src:pic11, progress: this.state.counter > 100000 ? 100 : this.state.counter/100000 * 100},
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
            {name: 'A new moon!' , description: '1 month on plattform',src:pic1, progress: createdAt < hundredDaysago ? 100 : 0},
            {name: 'Yeariversary!' , description: '1 year on plattform',src:pic22, progress: createdAt < oneYear ? 365 : 0},
            {name: '2 YEARS!' , description: '2 years on plattform',src:pic23, progress: createdAt < twoYears ? 730 : 0},
    
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