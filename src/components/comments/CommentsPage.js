import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as storiesActions from '../../actions/storiesActions';
import {withRouter} from 'react-router-dom';

import './CommentsPage.css';
import CommentCard from '../common/CommentCard';

const generateCommentChain = (comment, index) => {
  return <Comment key={index} comment={comment}/>;
}

/**
 * Recursive wrapper component over CommentCard
 */
const Comment = ({comment}) => {
  let nestedComments;
  if (comment.children.length > 0) {
    nestedComments = comment.children.map(generateCommentChain);
  }
  return (
    <div>
      <CommentCard comment={comment}/>
      {nestedComments}
    </div>
  );
}

class CommentsPage extends React.Component {

  render() {
    if (!this.props.story) return <div></div>;

    const commentCardChain = this.props.story.children.map(generateCommentChain, this);

    return (
      <div>
        <div>{this.props.story.title}</div>
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