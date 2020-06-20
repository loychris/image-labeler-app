import React, { Component } from "react";
import { Link } from 'react-router-dom';

import classes from './Auth.module.css';

import AuthTab from './AuthTab/AuthTab';


class Login extends Component {

    state = {
        userType: 'user', // <-> 'uploader'
        currentlyShowing: 'login' // <-> 'signup'
    }

    getUserLoginForm = () => {
        return(
            <form className={classes.form}>
                <h3>User Login</h3>
                <label>email</label><br/>
                <input type='text'/><br/>
                <label>password</label><br/>
                <input type='text'/><br/>
                <input type='submit' value='Login'/>
            </form> 
        )
    }

    getUserSignupForm = () => {
        return(
            <form className={classes.form}>
                <h3>Create a user account</h3>
                <label>Username:</label><br/>
                <input type='text'/><br/>
                <label>Email:</label><br/>
                <input type='text'/><br/>
                <label>Password:</label><br/>
                <input type='text'/><br/>
                <input type='submit' value='Create Account'/>
            </form>
        )
    }

    getUploaderLoginForm = () => {
        return(
            <form className={classes.form}>
                <h3>Uploader Login</h3>
                <label>email</label><br/>
                <input type='text'/><br/>
                <label>password</label><br/>
                <input type='text'/><br/>
                <input type='submit' value='Login'/>
            </form>
        )
    }

    getUploaderSignupForm = () => {
        return(
            <form className={classes.form}>
                <h3>Create a Uploader account</h3>
                <label>Name:</label><br/>
                <input type='text'/><br/>
                <label>Company / Institution:</label><br/>
                <input type='text'/><br/>
                <label>Email:</label><br/>
                <input type='text'/><br/>
                <label>Password:</label><br/>
                <input type='text'/><br/>
                <input type='submit' value='Create Account'/>
            </form>
        )
    }  

    switchToUser = () => {
        if(this.state.userType !== 'user'){
            this.setState({userType: 'user'})
        }
    }

    switchToUploader = () => {
        if(this.state.userType !== 'uploader'){
            this.setState({userType: 'uploader'})
        }
    }

    switchToLogin = () => {
        if(this.state.currentlyShowing !== 'login'){
            this.setState({currentlyShowing: 'login'})
        }
    }

    switchToSignup = () => {
        if(this.state.currentlyShowing !== 'signup'){
            this.setState({currentlyShowing: 'signup'})
        }
    }



    render(){

        let inputs;

        if(this.state.userType === 'user'){
            if(this.state.currentlyShowing === 'login'){
                inputs = this.getUserLoginForm();
            } else {
                inputs = this.getUserSignupForm(); 
            }
        } else {
            if(this.state.currentlyShowing === 'login'){
                inputs = this.getUploaderLoginForm();
            }else {
                inputs = this.getUploaderSignupForm();
            }
        }

        const styleClasses = [classes.login];
        return(    
            <div>
                <Link to='/'>
                    <div className={classes.backDrop}></div>
                </Link>
                <div className={styleClasses.join(' ')}>
                    <div className={classes.userOptions}>
                        <AuthTab 
                            active={this.state.userType === 'user'}
                            value={'User'} 
                            clicked={this.switchToUser}/>
                        <AuthTab 
                            active={this.state.userType === 'uploader'}
                            value={'Uploader'} 
                            clicked={this.switchToUploader}/>
                    </div>
                    <div className={classes.loginSignup}>
                        <AuthTab 
                            active = {this.state.currentlyShowing === 'login'} 
                            value = {'Login'} 
                            clicked = {this.switchToLogin}/>
                        <AuthTab 
                            active = {this.state.currentlyShowing === 'signup'} 
                            value = {'Signup'} 
                            clicked = {this.switchToSignup}/>
                    </div>
                    <form>
                        {inputs}
                    </form>
                </div>
            </div>

        )
    }
}

export default Login;