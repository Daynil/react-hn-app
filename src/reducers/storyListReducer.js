import * as types from '../actions/actionTypes';
import initialState from './initialState';

export default function storiesReducer(state = initialState.storyLists, action) {
  switch (action.type) {
    case types.LOAD_LIST_SUCCESS:
      let newState = {...state};
      newState[action.listType] = action.list;
      return newState;

    default:
      return state;
  }
}