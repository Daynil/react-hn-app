import * as types from '../actions/actionTypes';
import initialState from './initialState';

export default function storiesReducer(state = initialState.stories, action) {
  switch (action.type) {
    case types.LOAD_STORIES_SUCCESS:
      return action.stories.map(story => {
        return {...story, children: steamrollComments(story.children, -1)};
      });
    
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

function steamrollComments(comments, recursiveDepth) {
  let steamrolledComments = [];
  
  if (comments.length > 0) {
    recursiveDepth = recursiveDepth + 1;
    comments.forEach(comment => {
      let children = JSON.parse(JSON.stringify(comment.children));
      delete comment.children;
      comment.depth = recursiveDepth;
      steamrolledComments.push(comment);
      steamrolledComments = steamrolledComments.concat(steamrollComments(children, recursiveDepth));
    });
  }

  return steamrolledComments;
}

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