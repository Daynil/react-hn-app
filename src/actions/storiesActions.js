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

export function loadListSuccess(listType, list) {
  return {type: types.LOAD_LIST_SUCCESS, listType, list}
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
      let list = await fetch(`/api/listorder/${type}`);
      list = await list.json();
      dispatch(loadListSuccess(type, list));
      dispatch(loadStoriesByType(type, 20, true));
    } catch (error) {
      dispatch(ajaxCallError(error));
    }
  }
}

export function loadStoriesByType(type, amount, needFresh) {
  return async (dispatch, getState) => {
    dispatch(beginAjaxCall());
    const postsToFetch = postsNeedingFetch(type, amount, needFresh, getState());
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
  const storyList = state.storyLists[type].slice(0, amount);
  if (needFresh) return storyList;

  const currentStoryIds = state.stories.map(story => story.id);
  let postIdsToFetch = [];

  
  storyList.forEach(storyId => {
    if (currentStoryIds.indexOf(storyId) === -1) postIdsToFetch.push(storyId);
  });
  
  return postIdsToFetch;
}