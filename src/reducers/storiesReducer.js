import * as types from '../actions/actionTypes';
import initialState from './initialState';

export default function storiesReducer(state = initialState.stories, action) {
  switch (action.type) {
    case types.LOAD_STORIES_SUCCESS:
      return [...state, ...action.stories];
    
    case types.TOGGLE_COMMENT:
      return state.map(story => {
        return story.id === action.storyId ?
          {...story, children: commentState(action.commentId, story.children)} :
          story
      });

    default:
      return state;
  }
}

/**
 * Recursively walk comments to find and adjust comment to toggle
 */
function commentState(commentId, comments) {
  let newComments = [];

  if (comments.length > 0) {
    comments.forEach(comment => {
      if (comment.id === commentId) {
        if (comment.hasOwnProperty('minimized')) comment.minimized = !comment.minimized;
        else comment.minimized = true;
      }
      comment.children = commentState(commentId, comment.children);
      newComments.push(comment);
    });
  }

  return newComments;
}