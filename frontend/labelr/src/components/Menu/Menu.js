import React, { Component } from 'react';
import { Link } from 'react-router-dom';


import classes from './Menu.module.css';


class Menu extends Component {

    state = {
        expanded: true
    }

    expnad = () => {
        this.setState({expanded: true})
    }

    collapse = () => {
        this.setState({expanded: false})
    }

    render() {
        
        const styleClasses = [classes.menu]; 
        if(this.state.expanded === true) styleClasses.push(classes.expanded)
        else styleClasses.push(classes.collapsed)
        
        const collapseButton = this.state.expanded ? <button onClick={this.collapse}>Collapse Menu</button> : null
        const expandButton = !this.state.expanded ? <button onClick={this.expnad}>Menu</button> : null

        const menuItemsExpanded = this.state.expanded ? 
            <div>
                <h1>MENU</h1>
                <Link to='/'>HOME</Link><br/>
                <Link to='/login'>LOGIN</Link>
                {/*  ^^^^^^ Nur Dummy Content bisher um Links zu testen. Menu hier befüllen */}
            </div> : null; 

        const menuItemsCollapsed = !this.state.expanded ? 
            <div>
                {/* Hier nur icons der Menu optionen */}
            </div> : null;



        return(
            <div className={styleClasses.join(' ')}>
                {collapseButton}
                {expandButton}
                {menuItemsExpanded}
                {menuItemsCollapsed}
            </div>
        )
    }
}

export default Menu;