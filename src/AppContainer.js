import React, { Component } from 'react';
import {Route, withRouter} from 'react-router-dom';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as storiesActions from './actions/storiesActions';
import Navigation from './components/common/Navigation';
import HotPage from './components/hot/HotPage';
import TopPage from './components/top/TopPage';

class AppContainer extends Component {
  
  render() {
    return (
      <div>
        <Navigation loading={this.props.loading}/>
        <div className="page-wrapper">
          <Route exact path="/" component={HotPage} />
          <Route exact path="/top" component={TopPage} />
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