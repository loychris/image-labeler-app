import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import Button from 'react-bootstrap/Button';


import classes from './Menu.module.css';


class Menu extends Component {

    state = {
        expanded: true
    }

    expand = () => {
        this.setState({expanded: true})
    }

    collapse = () => {
        this.setState({expanded: false})
    }

    render() {
        
        const styleClasses = [classes.menu]; 
        if(this.state.expanded === true){
            styleClasses.push(classes.expanded); 
        } else {
            styleClasses.push(classes.collapsed);
        }
        // const collapseButton = this.state.expanded ? <button onClick={this.collapse}>Collapse Menu</button> : null
        const collapseButton = this.state.expanded ? <Button variant="primary" onClick={this.collapse}>Collapse Menu</Button> : null
        // const expandButton = !this.state.expanded ? <button onClick={this.expand}>Menu</button> : null
        const expandButton = !this.state.expanded ? <Button variant="secondary" onClick={this.expand}>Menu</Button> : null
        const menuItemsExpanded = this.state.expanded ? 
            <div>
                <h1>MENU</h1>
                <Link to='/'>HOME</Link><br/>
                <Link to='/login'>LOGIN</Link><br/>
                <Button variant="success">Success</Button>{' '}
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
