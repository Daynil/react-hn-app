import React, { Component } from 'react';
import AppContainer from './AppContainer';
import './App.css';

import {BrowserRouter as Router} from 'react-router-dom';

import {Provider} from 'react-redux';
import configureStore from './store/configureStore'
import {refreshList} from './actions/storiesActions';

const store = configureStore();
store.dispatch(refreshList('top'));

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <AppContainer/>
        </Router>
      </Provider>
    );
  }
}

export default App;
