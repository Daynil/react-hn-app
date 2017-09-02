import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as storiesActions from '../../actions/storiesActions';
import {withRouter} from 'react-router-dom';

import './CommentsPage.css';
import CommentCard from '../common/CommentCard';
import StoryCard from '../common/StoryCard';

const generateCommentChain = (onClick, isHidden, levelOfRecursion) => {
  return (comment, index) => <CommentWrap key={index}
                                          comment={comment}
                                          onClick={onClick}
                                          isHidden={isHidden}
                                          level={levelOfRecursion}/>;
}

/**
 * Recursive wrapper component over CommentCard
 */
const CommentWrap = ({comment, onClick, isHidden, level}) => {

  let nestedComments;
  if (comment.children.length > 0) {
    const childLevel = level + 1;
    const childrenHidden = isHidden || comment.minimized;
    nestedComments = comment.children.map(generateCommentChain(onClick, childrenHidden, childLevel));
  }
  return (
    <div>
      <CommentCard comment={comment} onClick={onClick} isHidden={isHidden} level={level}/>
      {nestedComments}
    </div>
  );
}

class CommentsPage extends React.Component {

  componentDidMount() {
    window.scrollTo(0, 0);
  }

  toggleComment = commentId => {
    this.props.actions.toggleComment(this.props.story.id, commentId);
  }

  render() {
    if (!this.props.story) return null;
    const commentCardChain = this.props.story.children.map(generateCommentChain(this.toggleComment, false, 0));
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