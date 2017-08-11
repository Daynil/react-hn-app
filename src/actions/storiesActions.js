import * as types from './actionTypes';

export function loadStoriesSuccess(stories) {
  return {type: types.LOAD_STORIES_SUCCESS, stories};
}

export function loadStories() {
  return function(dispatch) {
    return fetch('/api/stories')
      .then(stories => stories.json())
      .then(stories => {
        dispatch(loadStoriesSuccess(stories));
      }).catch(error => {
        throw(error);
      });
  };
}