import React from 'react';

import Card, {CardContent} from 'material-ui/Card';
import IconButton from 'material-ui/IconButton';
import Typography from 'material-ui/Typography';

import './StoryCard.css'

const StoryCard = ({story}) => {
  return (
    <Card className="card">
      <div className="heat-index"></div>
      <CardContent className="score">
        <Typography type="headline" color="primary">
          {story.score}
        </Typography>
      </CardContent>
      <CardContent>
        <Typography type="headline">
          <a href={story.url} target="_blank" className="story-link">{story.title}</a>
        </Typography>
        <Typography type="body1" color="secondary">by {story.by}</Typography>
      </CardContent>
    </Card>
  );
};

export default StoryCard;