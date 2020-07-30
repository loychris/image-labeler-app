import React, { useContext } from 'react';
import { AuthContext } from '../../context/auth-context';
import { Link } from 'react-router-dom/cjs/react-router-dom.min';
import classes from './AuthButton.module.css';

const AuthButton = (props) => {

    const auth = useContext(AuthContext);

    const button = auth.isLoggedIn ? 
        <Link><button>log out</button></Link>
        : 
        <Link to='/login'><button onClick={props.logout}>Login</button></Link>

    return(
        <li className={classes.authButton}>
            {button}
        </li>

    )
}

export default AuthButton;