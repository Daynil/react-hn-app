import React from 'react';

import Card, {CardContent, CardHeader} from 'material-ui/Card';
import Icon from 'material-ui/Icon';
import IconButton from 'material-ui/IconButton';
import Typography from 'material-ui/Typography';

import {getAge, getCommentCount} from '../../utilities/utilities';
import DOMPurify from 'dompurify';

import './CommentCard.css';

const offsetFactor = 40;

const getSanitizedMarkup = (dirtyString) => {
  return {
    __html: DOMPurify.sanitize(dirtyString)
  };
}

const CommentCard = ({comment, onClick, isHidden, level}) => {
  
  const onMinimizeClick = () => {
    onClick(comment.id);
  }

  const getBody = (comment) => {
    return !comment.minimized ? (
      <Typography type="body1">
        <div dangerouslySetInnerHTML={getSanitizedMarkup(comment.text)}></div>
      </Typography>
    ) : null;
  }

  return comment.text && !isHidden ? (
    <Card className="card" style={{marginLeft: `${level * offsetFactor}px`}}>
      <CardContent>
        <Typography type="body1" color="secondary" className="poster">
          {comment.author} {getAge(comment.created_at_i)}
        </Typography>
        <IconButton onClick={onMinimizeClick} className="min-button">
          {!comment.minimized ?
            <Icon color="primary" style={{ fontSize: 14 }}>remove</Icon> :
            <Icon color="primary" style={{ fontSize: 14 }}>add</Icon>
          }
        </IconButton>
        <Typography type="body1" color="secondary" className="poster">
          {comment.minimized && ` (${getCommentCount(comment.children)} chidren)`}
        </Typography>
        {getBody(comment)}
      </CardContent>
    </Card>
  ): null;
};

export default CommentCard;