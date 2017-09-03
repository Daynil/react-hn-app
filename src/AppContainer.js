import React, { Component } from 'react';
import {Route, withRouter, Redirect} from 'react-router-dom';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as storiesActions from './actions/storiesActions';
import Navigation from './components/common/Navigation';
import StoriesPage from './components/stories/StoriesPage';
import CommentsPage from './components/comments/CommentsPage';

class AppContainer extends Component {
  
  render() {
    return (
      <div style={{backgroundColor: 'hsl(0, 0%, 98%)'}}>
        <Navigation loading={this.props.loading}/>
        <div className="page-wrapper">
          <Route exact path="/" render={() => <Redirect to="/stories/top"/>}/>
          <Route path="/stories/:type" component={StoriesPage}/>
          <Route path="/comment/:id" component={CommentsPage} />
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