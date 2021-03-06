import React, { Component } from 'react';
import {Route, withRouter, Redirect} from 'react-router-dom';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as storiesActions from './actions/storiesActions';
import Navigation from './components/common/Navigation';
import StoriesPage from './components/stories/StoriesPage';
import CommentsPage from './components/comments/CommentsPage';
import AboutPage from './components/about/AboutPage';

class AppContainer extends Component {
  
  render() {
    return (
      <div style={{backgroundColor: 'hsl(0, 0%, 98%)', minHeight: '100vh'}}>
        <Navigation/>
        <div className="page-wrapper">
          <Route exact path="/" render={() => <Redirect to="/stories/top"/>}/>
          <Route path="/stories/:type" component={StoriesPage}/>
          <Route path="/comment/:id" component={CommentsPage} />
          <Route path="/about" component={AboutPage} />
        </div>
      </div>
    );
  }
}

function mapStateToProps(state, ownProps) {
  return {
    loading: state.ajaxInfo.ajaxInProgress
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(storiesActions, dispatch)
  };
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(AppContainer));