import * as types from '../actions/actionTypes';
import initialState from './initialState';

function actionTypeEndsInSuccess(type) {
  return type.substring(type.length - 8) === '_SUCCESS';
}

export default function ajaxStatusReducer(state = initialState.ajaxInfo, action) {
  if (action.type === types.BEGIN_AJAX_CALL) {
    return {
      ...state,
      ajaxInProgress: true
    };
  } else if (actionTypeEndsInSuccess(action.type)) {
    return {
      ...state,
      ajaxInProgress: false,
      backgroundLoad: false
    };
  } else if (action.type === types.AJAX_CALL_ERROR) {
    return {
      ajaxInProgress: false,
      error: action.error
    };
  } else if (action.type === types.BACKGROUND_AJAX) {
    return {
      ...state,
      backgroundLoad: true
    }
  }

  return state;
}