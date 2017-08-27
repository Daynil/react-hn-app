import * as types from './actionTypes';

export function toggleComment(storyId, commentId) {
  return {type: types.TOGGLE_COMMENT, storyId, commentId};
}

export function beginAjaxCall() {
  return {type: types.BEGIN_AJAX_CALL};
}

export function ajaxCallError(error) {
  return {type: types.AJAX_CALL_ERROR, error};
}

export function loadStoriesSuccess(stories) {
  return {type: types.LOAD_STORIES_SUCCESS, stories};
}

export function loadStories() {
  return async (dispatch) => {
    dispatch(beginAjaxCall());
    try {
      let stories = await fetch('/api/stories');
      stories = await stories.json();
      dispatch(loadStoriesSuccess(stories));
    } catch (error) {
      dispatch(ajaxCallError(error));
    }
  };
}