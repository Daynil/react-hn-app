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

const CommentCard = ({comment, level}) => {
  return comment.text ? (
    <Card className="card" style={{marginLeft: `${level * offsetFactor}px`}}>
      <CardContent>
        <Typography type="body1" color="secondary">
          {comment.author} {getAge(comment.created_at_i)}
        </Typography>
        <Typography type="p">
          <div dangerouslySetInnerHTML={getSanitizedMarkup(comment.text)}></div>
        </Typography>
      </CardContent>
    </Card>
  ): null;
};

export default CommentCard;