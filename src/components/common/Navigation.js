import React from 'react';
import {NavLink, withRouter, } from 'react-router-dom';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as storiesActions from '../../actions/storiesActions';

import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import Button from 'material-ui/Button';
import IconButton from 'material-ui/IconButton';
import logo from  '../../react-logo.png';
import './Navigation.css';

const Navigation = ({loading, lists, actions}) => {

  const triggerReload = item => {
    const list = item.target.textContent.toLowerCase();
    if (lists[list].list.length === 0) {
      actions.refreshList(list);
    }
  }

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

        <NavLink to="/stories/top" className="nav-button" activeClassName="active">
          <Button onClick={triggerReload} className="nav-button" color="contrast">
            Top
          </Button>
        </NavLink>
        <NavLink to="/stories/best" className="nav-button" activeClassName="active">
          <Button onClick={triggerReload} className="nav-button" color="contrast">
            Best
          </Button>
        </NavLink>
        <NavLink to="/stories/new" className="nav-button" activeClassName="active">
          <Button onClick={triggerReload} className="nav-button" color="contrast">
            New
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

function mapStateToProps(state, ownProps) {
  return {
    lists: state.storyLists,
    loading: state.ajaxInfo.ajaxInProgress || state.ajaxInfo.backgroundLoad
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(storiesActions, dispatch)
  };
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Navigation));