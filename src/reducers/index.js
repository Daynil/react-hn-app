import {combineReducers} from 'redux';
import stories from './storiesReducer';
import ajaxInfo from './ajaxStatusReducer';
import storyLists from './storyListReducer';

const rootReducer = combineReducers({
  stories,
  ajaxInfo,
  storyLists
});

export default rootReducer;