import {combineReducers} from 'redux';
import stories from './storiesReducer';
import ajaxInfo from './ajaxStatusReducer';

const rootReducer = combineReducers({
  stories,
  ajaxInfo
});

export default rootReducer;