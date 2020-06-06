import React, { Component } from "react";
import classes from './Auth.module.css';

import AuthTab from './AuthTab/AuthTab';


class Login extends Component {

    state = {
        userType: 'user', // <-> 'uploader'
        currentlyShowing: 'login' // <-> 'signup'
    }

    getUserLoginForm = () => {
        return(
            <form className={classes.loginForm}>
                <h3>User Login</h3>
                <label>email</label>
                <input type='text'/>
                <label>password</label>
                <input type='text'/>
            </form>
        )
    }

    getUserSignupForm = () => {
        return(
            <form>
                <h3>Create a user account</h3>
                <label>Username:</label>
                <input type='text'/>
                <label>Email:</label>
                <input type='text'/>
                <label>Password:</label>
                <input type='text'/>
                <input type='submit' value='Create Account'/>
            </form>
        )
    }

    getUploaderLoginForm = () => {
        return(
            <form>
                <h3>Uploader Login</h3>
                <label>email</label>
                <input type='text'/>
                <label>password</label>
                <input type='text'/>
            </form>
        )
    }

    getUploaderSignupForm = () => {
        return(
            <form>
                <h3>Create a Uploader account</h3>
                <label>Name:</label>
                <input type='text'/>
                <label>Company / Institution:</label>
                <input type='text'/>
                <label>Email:</label>
                <input type='text'/>
                <label>Password:</label>
                <input type='text'/>
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

        let form;

        if(this.state.userType === 'user'){
            if(this.state.currentlyShowing === 'login'){
                form = this.getUserLoginForm();
            } else {
                form = this.getUserSignupForm(); 
            }
        } else {
            if(this.state.currentlyShowing === 'login'){
                form = this.getUploaderLoginForm();
            }else {
                form = this.getUploaderSignupForm();
            }
        }

        return(    
            <div className={classes.login}>
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
                {form}
            </div>
        )
    }
}

export default Login;