import React, { Component } from 'react';
import {Route, withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as storiesActions from './actions/storiesActions';
import Navigation from './components/common/Navigation';
import HotPage from './components/hot/HotPage';
import TopPage from './components/top/TopPage';
import CommentsPage from './components/comments/CommentsPage';

class AppContainer extends Component {
  
  render() {
    return (
      <div>
        <Navigation loading={this.props.loading}/>
        <div className="page-wrapper">
          <Route exact path="/" component={HotPage}/>
          <Route path="/top" component={TopPage}/>
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