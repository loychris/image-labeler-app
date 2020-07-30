import React, { useState, useContext } from "react";
import { Formik } from 'formik';
import Button from '@material-ui/core/Button';
import { AuthContext } from '../context/auth-context';
import axios from 'axios';


import classes from './Auth.module.css';

import AuthTab from './AuthTab/AuthTab';


function Auth(props) {

    const auth = useContext(AuthContext);
    

    const [userType, setUserType ] = useState('User') // <-> 'uploader'
    const [currentForm, setCurrentForm] = useState('login') // <-> 'signup'
    const [incorrectPW, setIncorrectPW] = useState(false);

    const getArrow = () => {
        return(
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g id="arrow_forward_24px">
                <path id="icon/navigation/arrow_forward_24px" d="M12 4L10.59 5.41L16.17 11H4V13H16.17L10.59 18.59L12 20L20 12L12 4Z" fill="#001628"/>
                </g>
            </svg>
        )
    }

    const handleLogin = async (values, { setSubmitting }) => {
        setSubmitting(false);

        axios.post('/users/login', JSON.stringify({
            email: values.email,
            password: values.password
        }), {
            headers: { 'Content-Type': 'application/json' }
        })
        .then(response => { 
            auth.login(response.data.user, response.data.token);
        })
        .catch(error => {
            console.log("THERE WAS AN ERROR WHILE LOGGING IN")
            console.log(error);
            if(error.response && error.response.status === 400 && !incorrectPW){
                setIncorrectPW(true);
            }
        });
    }

    const handleSignup = async (values, { setSubmitting }) => {
        setSubmitting(false);

        axios.post('/users', JSON.stringify({
            name: values.username,
            email: values.email,
            password: values.password,
            isUploader: userType === 'Uploader'
        }), {
            headers: { 'Content-Type': 'application/json' }
        })
        .then(response => {
            auth.login(response.data.user, response.data.token);
        }).catch(e => {
            console.log(e);
        })
    }


    const validateLogin = values => {
        const errors = {};
        if (!values.email) {
            errors.email = 'Required';
        } else if (
            !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
        ) {
            errors.email = 'Not a valid email address!';
        } 
        if(!values.password){
            errors.password = 'Required';
        } else if( values.password.length < 6){
            errors.password = 'Password must be at least 6 characters long'
        }
        return errors;
    }

    const validateSignup = values => {
        const errors = {};
        if(!values.username){
            errors.username = 'Required';
        }else if(values.username.length < 6){
            errors.username = 'Username must be at least 6 characters long';
        }
        if (!values.email) {
            errors.email = 'Required';
        } else if (
            !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i.test(values.email)
        ) {
            errors.email = 'Not a valid email address!';
        } 
        if(!values.password){
            errors.password = 'Required';
        } else if( values.password.length < 6){
            errors.password = 'Password must be at least 6 characters long'
        }
        return errors;
    }

    const getLoginForm = () => {
        return(
            <Formik
                initialValues={{ email: '', password: '' }}
                validate={validateLogin}
                onSubmit={handleLogin}
            >
                {({ values, errors, touched, handleChange, handleBlur, handleSubmit, isSubmitting }) => (
                <form className={classes.form} onSubmit={handleSubmit}>
                    <h3>{userType} login</h3>
                    <label>Email:</label>
                    <input
                        id="email"
                        type="email"
                        name="email"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.email}
                    />
                    <span className={classes.invalidMessage}>
                        {errors.email && touched.email && errors.email}
                    </span>
                    <br/>
                    <label>Password:</label>
                    <input
                        id="password"
                        type="password"
                        name="password"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.password}
                    />
                    <span className={classes.invalidMessage}>
                        {errors.password && touched.password && errors.password}<br/>
                    </span>
                    {incorrectPW ? <span className={classes.invalidMessage}>
                        Email or password incorrect. Please try again <br/>
                    </span>  : null}
                    <div className={classes.SwitchText} onClick={() => setCurrentForm('signup')}>Don't have an account? <strong>Sign up</strong> {getArrow()} </div>        
                    <button variant="contained" type="submit" disabled={isSubmitting} size='small'>
                        Login
                    </button>
                </form>
                )}
            </Formik>
        )
    }

    const getSignupForm = () => {
        return(
            <Formik
                initialValues={{ username: '', email: '', password: '' }}
                validate={validateSignup}
                onSubmit={handleSignup}
            >
                {({
                values,
                errors,
                touched,
                handleChange,
                handleBlur,
                handleSubmit,
                isSubmitting,
                /* and other goodies */
                }) => (
                <form className={classes.form} onSubmit={handleSubmit}>
                    <h3>create an {userType} account</h3>
                    <label>Username:</label>
                    <input
                        id="username"
                        type="text"
                        name="username"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.username}
                    /><br/>
                    <span className={classes.invalidMessage}>
                        {errors.username && touched.username && errors.username}
                    </span>
                    <label>Email:</label>
                    <input
                        id="email"
                        type="email"
                        name="email"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.email}
                    /><br/>
                    <span className={classes.invalidMessage}>
                        {errors.email && touched.email && errors.email}
                    </span>
                    <label>Password:</label>
                    <input
                        id="password"
                        type="password"
                        name="password"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.password}
                    /><br/>
                    <span className={classes.invalidMessage}>
                        {errors.password && touched.password && errors.password}<br/>
                    </span>   
                <div className={classes.SwitchText} onClick={() => setCurrentForm('login')}>Already have an account? <strong>Login</strong>{getArrow()}</div>                 
                    <button type="submit" disabled={isSubmitting} small>
                        Create Account
                    </button>
                </form>
                )}
            </Formik>
        )
    }



    let inputs = currentForm === 'login' ? getLoginForm() : getSignupForm();
    return(    
        <div>
            {props.loggedIn ? null: <div className={classes.backDrop}></div>}
            <div className={`${classes.login} ${props.loggedIn ? classes.hidden : ''}`}>
                <div className={classes.userOptions}>
                    <AuthTab 
                        active={userType === 'User'}
                        value={'User'} 
                        clicked={() => setUserType('User')}/>
                    <AuthTab 
                        active={userType === 'Uploader'}
                        value={'Uploader'} 
                        clicked={() => setUserType('Uploader')}/>
                </div>
                {inputs}
            </div>
        </div>
    )
}

export default Auth;