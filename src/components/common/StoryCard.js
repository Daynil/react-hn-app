import React from 'react';

import Card, {CardContent} from 'material-ui/Card';
import IconButton from 'material-ui/IconButton';
import Typography from 'material-ui/Typography';

const StoryCard = ({story}) => {
  return (
    <Card>
      <CardContent>
        <Typography type="headline">{story.title}</Typography>
      </CardContent>
    </Card>
  );
};

export default StoryCard;