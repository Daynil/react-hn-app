import React from 'react';

import Card, {CardContent} from 'material-ui/Card';
import Icon from 'material-ui/Icon';
import IconButton from 'material-ui/IconButton';
import Typography from 'material-ui/Typography';
import moment from 'moment';

import './CommentCard.css';

const getAge = (unixTime) => {
  let createdOn = moment.unix(unixTime);
  return createdOn.fromNow();
};

/**
 * Recursively walk comment tree to get comment count
 */
const getCommentCount = (comments) => {
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

const CommentCard = ({comment}) => {
  return comment.text ? (
    <Card className="card">
      <Typography type="subheading">
        {comment.author} {getAge(comment.created_at_i)}
      </Typography>
      <Typography type="headline">
        {comment.text}
      </Typography>
    </Card>
  ): null;
};

export default CommentCard;