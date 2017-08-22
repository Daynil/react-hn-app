import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as storiesActions from '../../actions/storiesActions';
import {withRouter} from 'react-router-dom';

import './CommentsPage.css';
import CommentCard from '../common/CommentCard';
import StoryCard from '../common/StoryCard';

const generateCommentChain = (levelOfRecursion) => {
  return (comment, index) => <CommentWrap key={index} comment={comment} level={levelOfRecursion}/>;
}

// const generateCommentChain = (comment, index) => {
//   return <CommentWrap key={index} comment={comment}/>;
// }

/**
 * Recursive wrapper component over CommentCard
 */
const CommentWrap = ({comment, level}) => {
  let nestedComments;
  if (comment.children.length > 0) {
    const childLevel = level + 1;
    nestedComments = comment.children.map(generateCommentChain(childLevel));
  }
  return (
    <div>
      <CommentCard comment={comment} level={level}/>
      {nestedComments}
    </div>
  );
}

class CommentsPage extends React.Component {

  render() {
    if (!this.props.story) return <div></div>;

    const commentCardChain = this.props.story.children.map(generateCommentChain(0));

    return (
      <div>
        <StoryCard story={this.props.story}></StoryCard>
        {commentCardChain}
      </div>
    );
  }
}

function getStoryById(stories, id) {
  const story = stories.filter(story => story.id === id);
  if (story) return story[0];
  return null;
}

function mapStateToProps(state, ownProps) {
  const storyId = +ownProps.match.params.id;
  let story;
  if (storyId && state.stories.length) {
    story = getStoryById(state.stories, storyId);
  }

  return {
    story: story
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(storiesActions, dispatch)
  };
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(CommentsPage));