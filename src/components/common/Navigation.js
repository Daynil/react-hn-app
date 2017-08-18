import React from 'react';
import {NavLink} from 'react-router-dom';

import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import Button from 'material-ui/Button';
import IconButton from 'material-ui/IconButton';
import logo from  '../../react-logo.png';
import './Navigation.css';

const Navigation = ({loading}) => {

  return (
    <AppBar position="static">
      <Toolbar className="nav-bar">
        <IconButton color="contrast">
          <img src={logo} alt="Logo"
               className={loading ? "logo spin-load" : "logo"}/>
        </IconButton>
        <Typography type="title" color="inherit">
          React HN
        </Typography>

        <div className="spacer"></div>

        <NavLink exact to="/" className="nav-button" activeClassName="active">
          <Button className="nav-button" color="contrast">
            Hot
          </Button>
        </NavLink>
        <NavLink to="/Top" className="nav-button" activeClassName="active">
          <Button className="nav-button" color="contrast">
            Top
          </Button>
        </NavLink>
        <NavLink to="/New" className="nav-button" activeClassName="active">
          <Button className="nav-button" color="contrast">
            New
          </Button>
        </NavLink>
        <NavLink to="/Show" className="nav-button" activeClassName="active">
          <Button className="nav-button" color="contrast">
            Show
          </Button>
        </NavLink>
        <NavLink to="/Ask" className="nav-button" activeClassName="active">
          <Button className="nav-button" color="contrast">
            Ask
          </Button>
        </NavLink>
        <NavLink to="/Jobs" className="nav-button" activeClassName="active">
          <Button className="nav-button" color="contrast">
            Jobs
          </Button>
        </NavLink>
        <NavLink to="/About" className="nav-button" activeClassName="active">
          <Button className="nav-button" color="contrast">
            About
          </Button>
        </NavLink>
        
      </Toolbar>
    </AppBar>
  );
}

export default Navigation;