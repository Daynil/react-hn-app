import React, { Component } from 'react';
import './App.css';

import {BrowserRouter as Router, Route} from 'react-router-dom';
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
            <Route exact path="/" component={HotPage} />
            <Route path="/top" component={TopPage} />
          </div>
        </Router>
      </Provider>
    );
  }
}

export default App;
