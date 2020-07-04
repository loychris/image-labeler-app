import React, { useState, useContext } from "react";
import { Link } from 'react-router-dom';
import { Formik, Form, Field, ErrorMessage } from 'formik';

import { AuthContext } from '../context/auth-context';
import { useHttpClient } from './http-hook';


import classes from './Auth.module.css';

import AuthTab from './AuthTab/AuthTab';


function Auth(props) {

    const auth = useContext(AuthContext);
    const { isLoading, error, sendRequest, clearError } = useHttpClient();


    const [userType, setUserType] = useState('User') // <-> 'uploader'
    const [currentForm, setCurrentForm] = useState('login') // <-> 'signup'



    const switchToUser = () => {
        if(userType !== 'User'){
            setUserType('User');
        }
    }

    const switchToUploader = () => {
        if(userType !== 'Uploader'){
            setUserType('Uploader');
        }
    }

    const switchToLogin = () => {
        if(currentForm !== 'login'){
            setCurrentForm('login');
        }
    }

    const switchToSignup = () => {
        if(currentForm !== 'signup'){
            setCurrentForm('signup');
        }
    }

    const handleLogin = async (values, { setSubmitting }) => {
        setSubmitting(false);
        const body = JSON.stringify({
            email: values.email,
            password: values.password
        })
        const responseData = await sendRequest(
            'http://127.0.0.1:3000/users/login',
            'POST',
            body,
            {
            'Content-Type': 'application/json'
            }
        );
        auth.login(responseData.user, responseData.token);
    }

    const handleSignup = async (values, { setSubmitting }) => {
        setSubmitting(false);
        const body = JSON.stringify({
            name: values.username,
            email: values.email,
            password: values.password,
            isUploader: userType === 'Uploader'
        })
        const responseData = await sendRequest(
            'http://127.0.0.1:3000/users',
            'POST',
            body,
            {
            'Content-Type': 'application/json'
            }
        );
        console.log("__________________________")
        console.log(responseData);
        auth.login(responseData.user, responseData.token);
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
                    <button type="submit" disabled={isSubmitting}>
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
                    <h3>{userType} login</h3>
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
                        value={values.passw3000ord}
                    /><br/>
                    <span className={classes.invalidMessage}>
                        {errors.password && touched.password && errors.password}<br/>
                    </span>                    
                    <button type="submit" disabled={isSubmitting}>
                    Submit
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
                        clicked={switchToUser}/>
                    <AuthTab 
                        active={userType === 'Uploader'}
                        value={'Uploader'} 
                        clicked={switchToUploader}/>
                </div>
                <div className={classes.loginSignup}>
                    <AuthTab 
                        active = {currentForm === 'login'} 
                        value = {'Login'} 
                        clicked = {switchToLogin}/>
                    <AuthTab 
                        active = {currentForm === 'signup'} 
                        value = {'Signup'} 
                        clicked = {switchToSignup}/>
                </div>
                {inputs}
            </div>
        </div>
    )
}

export default Auth;