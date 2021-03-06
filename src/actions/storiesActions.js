import * as types from './actionTypes';

export function toggleComment(storyId, commentId) {
  return {type: types.TOGGLE_COMMENT, storyId, commentId};
}

export function beginAjaxCall() {
  return {type: types.BEGIN_AJAX_CALL};
}

export function backgroundAjax() {
  return {type: types.BACKGROUND_AJAX};
}

export function ajaxCallError(error) {
  return {type: types.AJAX_CALL_ERROR, error};
}

export function loadStoriesSuccess(stories) {
  return {type: types.LOAD_STORIES_SUCCESS, stories};
}

export function loadListSuccess(listType, list) {
  return {type: types.LOADED_LIST, listType, list}
}

export function listIncrement(listType) {
  return {type: types.INCREMENT_LIST_AMOUNT, listType};
}

/**
 * Refresh or newly load entire list of given type
 * 
 * @export
 * @param {any} type 
 * @param {any} amount 
 * @returns 
 */
export function refreshList(type) {
  return async (dispatch) => {
    try {
      dispatch(beginAjaxCall());
      let list = await fetch(`/api/listorder/${type}`);
      list = await list.json();
      dispatch(loadListSuccess(type, list));
      dispatch(loadStoriesByType(type, true));
    } catch (error) {
      dispatch(ajaxCallError(error));
    }
  }
}

export function incrementList(type) {
  return async(dispatch) => {
    try {
      dispatch(backgroundAjax());
      dispatch(loadStoriesByType(type, false));
    } catch (error) {
      dispatch(ajaxCallError(error));
    }
  }
}

export function loadStoriesByType(type, needFresh) {
  return async (dispatch, getState) => {
    const state = getState();
    const amount = state.storyLists[type].amount + 20;
    const postsToFetch = postsNeedingFetch(type, amount, needFresh, state);
    try {
      let stories = await fetch('/api/stories', 
                                {
                                  method: 'POST', 
                                  headers: {
                                    'Content-Type': 'application/json'
                                  },
                                  body: JSON.stringify(postsToFetch)
                                });
      stories = await stories.json();
      if (!needFresh) dispatch(listIncrement(type));
      dispatch(loadStoriesSuccess(stories));
    } catch (error) {
      console.log(error);
      dispatch(ajaxCallError(error));
    }
  };
}

export function loadStoriesByTime() {

}

function postsNeedingFetch(type, amount, needFresh, state) {
  const storyList = state.storyLists[type].list.slice(0, amount);
  if (needFresh) return storyList;

  const currentStoryIds = state.stories.map(story => story.id);
  let postIdsToFetch = [];

  
  storyList.forEach(storyId => {
    if (currentStoryIds.indexOf(storyId) === -1) postIdsToFetch.push(storyId);
  });
  
  return postIdsToFetch;
}