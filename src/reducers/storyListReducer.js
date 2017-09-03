import * as types from '../actions/actionTypes';
import initialState from './initialState';

export default function storiesReducer(state = initialState.storyLists, action) {
  switch (action.type) {
    case types.LOAD_LIST_SUCCESS:
      let newStateList = {...state};
      newStateList[action.listType].list = action.list;
      return newStateList;
    
    case types.INCREMENT_LIST_AMOUNT:
      let newStateAmount = {...state};
      newStateAmount[action.listType].amount += 20;
      return newStateAmount;

    default:
      return state;
  }
}