import * as types from './actionTypes';

export function loadStoriesSuccess(stories) {
  return {type: types.LOAD_STORIES_SUCCESS, stories};
}

export function loadStories() {
  return async (dispatch) => {
    try {
      let stories = await fetch('/api/stories');
      stories = await stories.json();
      dispatch(loadStoriesSuccess(stories));
    } catch (error) {
      throw(error);
    }
  };
}