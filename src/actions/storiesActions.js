import * as types from './actionTypes';

export function loadStoriesSuccess(stories) {
  return {type: types.LOAD_STORIES_SUCCESS, stories};
}

export function loadStories() {
  return {type: types.LOAD_STORIES}
}