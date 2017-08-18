import * as types from '../actions/actionTypes';
import initialState from './initialState';

export default function storiesReducer(state = initialState.stories, action) {
  switch (action.type) {
    case types.LOAD_STORIES_SUCCESS:
      return action.stories;

    default:
      return state;
  }
}