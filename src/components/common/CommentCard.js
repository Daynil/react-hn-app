import React from 'react';

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
      <span>
        <span dangerouslySetInnerHTML={getSanitizedMarkup(comment.text)}></span>
      </span>
    ) : null;
  }

  const getMinTitle = (minimized) => {
    return !minimized ? 'comment' : 'comment minimized';
  }

  return comment.text && !isHidden ? (
    <div className={getMinTitle(comment.minimized)} style={{marginLeft: `${level * offsetFactor}px`}}>
      <div>
        <span className="title">
          <span>
            {comment.author} {getAge(comment.created_at_i)}
          </span>
          <span onClick={onMinimizeClick} className="min-button">
            {!comment.minimized ?
              <span>[ - ]</span> :
              <span>[ + ]</span>
            }
          </span>
          <span>
            {comment.minimized && ` (${getCommentCount(comment.children)} chidren)`}
          </span>
        </span>
        <span className="body">
          {getBody(comment)}
        </span>
      </div>
    </div>
  ): null;
};

export default CommentCard;