import {combineReducers} from 'redux';
import stories from './storiesReducer';

const rootReducer = combineReducers({
  stories
});

export default rootReducer;