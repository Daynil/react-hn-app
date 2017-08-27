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

  const cardType = (comment) => {
    return !comment.minimized ? (
        <Card className="card" style={{marginLeft: `${level * offsetFactor}px`}}>
        <CardContent>
          <IconButton onClick={onMinimizeClick}>
            <Icon color="primary">remove</Icon>
          </IconButton>
          <Typography type="body1" color="secondary">
            {comment.author} {getAge(comment.created_at_i)}
          </Typography>
          <Typography type="p">
            <div dangerouslySetInnerHTML={getSanitizedMarkup(comment.text)}></div>
          </Typography>
        </CardContent>
      </Card>
    ) : (
      <div>minimized</div>
    );
  }

  return comment.text && !isHidden ? (cardType(comment)): null;
};

export default CommentCard;