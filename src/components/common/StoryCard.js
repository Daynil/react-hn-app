import React from 'react';

import Card, {CardContent} from 'material-ui/Card';
import Icon from 'material-ui/Icon';
import IconButton from 'material-ui/IconButton';
import Typography from 'material-ui/Typography';
import moment from 'moment';

import './StoryCard.css'

const getAge = (unixTime) => {
  let createdOn = moment.unix(unixTime);
  return createdOn.fromNow();
};

const parseDomain = (url) => {
  let re = new RegExp('^https?://?((www.)?[a-zA-Z0-9-_.]+)');
  let resArray = re.exec(url);
  return resArray ? resArray[1] : "";
};

const StoryCard = ({story}) => {
  return (
    <Card className="card">
      <div className="heat-index"></div>
      <CardContent className="score">
        <Typography type="headline" color="primary">
          {story.score}
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
          by {story.by} {getAge(story.time)}
        </Typography>
      </CardContent>
      <div className="spacer"></div>
      <CardContent>
        <div className="comment-container">
          <IconButton>
            <Icon color="primary">comment</Icon>
          </IconButton>
          <Typography type="subheading">
            {story.kids ? story.kids.length : "0"}
          </Typography>
        </div>
      </CardContent>
    </Card>
  );
};

export default StoryCard;