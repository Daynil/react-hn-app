import React, { Component } from 'react';
import './App.css';

import {BrowserRouter as Router, Route} from 'react-router-dom';
import Navigation from './components/common/Navigation';
import HotPage from './components/hot/HotPage';
import TopPage from './components/top/TopPage';

import {Provider} from 'react-redux';
import configureStore from './store/configureStore'
import {loadStories} from './actions/storiesActions';

const store = configureStore();
store.dispatch(loadStories());

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <div>
            <Navigation/>
            <div className="page-wrapper">
              <Route exact path="/" component={HotPage} />
              <Route exact path="/top" component={TopPage} />
            </div>
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
