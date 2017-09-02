import React from 'react';
import {Link} from 'react-router-dom';

import DOMPurify from 'dompurify';

import Card, {CardContent} from 'material-ui/Card';
import Icon from 'material-ui/Icon';
import IconButton from 'material-ui/IconButton';
import Typography from 'material-ui/Typography';

import {getAge, getCommentCount, getHeatIndex} from '../../utilities/utilities';

import './StoryCard.css';

/**
 * Extract base url from full address
 */
const parseDomain = (url) => {
  let re = new RegExp('^https?://?((www.)?[a-zA-Z0-9-_.]+)');
  let resArray = re.exec(url);
  return resArray ? resArray[1] : "";
};

const getSanitizedMarkup = (dirtyString) => {
  return {
    __html: DOMPurify.sanitize(dirtyString)
  };
}

const StoryCard = ({story, comments}) => {

  const getStoryText = (text) => {
    return text ? (
      <span>
        <span dangerouslySetInnerHTML={getSanitizedMarkup(text)}></span>
      </span>
    ) : null;
  }

  return (
    <Card className="card">
      <div className="heat-index" style={getHeatIndex(story)}></div>
      <CardContent className={!comments ? "score" : "score comments"}>
        <Typography type="headline">
          {story.points}
        </Typography>
      </CardContent>
      <CardContent className="middle">
        <div>
          <Typography type="headline">
            {
              story.url ?
              (<a href={story.url} target="_blank" className="story-link">{story.title}</a>)
              :
              story.title
            }
          </Typography>
          <Typography type="subheading" color="secondary">
            {parseDomain(story.url)}
          </Typography>
        </div>
        <Typography type="subheading" color="secondary" className="extra-info">
          by {" "}
          <a href={`https://news.ycombinator.com/user?id=${story.author}`}
             target="_blank"
             className="author">
            {story.author}
          </a>{" "}
          {getAge(story.created_at_i)}
        </Typography>
        {comments &&
        <Typography>
          {getStoryText(story.text)}
        </Typography>
        }
      </CardContent>
      <div className="spacer"></div>
      <CardContent>
        <div className="comment-container">
          <Link to={`/comment/${story.id}`} className="comment-button">
            <IconButton>
              <Icon color="primary">comment</Icon>
            </IconButton>
          </Link>
          <Typography type="subheading">
            {getCommentCount(story.children)}
          </Typography>
        </div>
      </CardContent>
    </Card>
  );
};

export default StoryCard;