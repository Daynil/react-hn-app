import moment from 'moment';

export const getAge = (unixTime) => {
  let createdOn = moment.unix(unixTime);
  return createdOn.fromNow();
};

/**
 * Recursively walk comment tree to get comment count
 */
export const getCommentCount = (comments) => {
  let commentCount = 0;
  comments = comments.filter(comment => comment.text);

  if (comments.length > 0) {
    commentCount += comments.length;
    comments.forEach(comment => {
      commentCount += getCommentCount(comment.children);
    });
  }

  return commentCount;
}

export const getHeatIndex = (story) => {
  const storyAge = moment.unix(story.created_at_i);
  let redAdjust = story.points / storyAge.minutes();
  let redness = (redAdjust > 50) ? 50 : redAdjust;
  let heatIndex = 100 - redness;
  return {backgroundColor: `hsl(0, 50%, ${heatIndex}%`};
}

export const selectStories = (state, type) => {
  let selectedStories = JSON.parse(JSON.stringify(state.stories));
  const stateList = state.storyLists[type].list;
  const stateAmount = state.storyLists[type].amount;
  const storyList = [...stateList].slice(0, stateAmount);
  return selectedStories.filter(story => storyList.indexOf(story.id) !== -1)
}

export const getStoryPath = (location) => {
  const currentPath = location.pathname.split('/');
  const subPath = currentPath[currentPath.length - 1];
  const storyPaths = ['top', 'best', 'new'];
  if (storyPaths.indexOf(subPath) !== -1) return subPath;
  else return '';
}