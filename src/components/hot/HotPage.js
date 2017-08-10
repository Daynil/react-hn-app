import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as storiesActions from '../../actions/storiesActions';
import {Link, withRouter} from 'react-router-dom';

import './HotePage.css';
import Card, {CardContent} from 'material-ui/Card';
import IconButton from 'material-ui/IconButton';
import Typography from 'material-ui/Typography';


class HotPage extends React.Component {

  render() {
    const storyCards = this.props.stories.map((story, i) => {
      return (
        <Card key={i}>
          <CardContent>
            <Typography type="headline">{story.title}</Typography>
          </CardContent>
        </Card>
      );
    });

    return (
      <div id="page-wrapper">
        <Link to="top">Goto top page</Link>
        {storyCards}
      </div>
    );
  }
}

function mapStateToProps(state, ownProps) {
  return {
    stories: state.stories
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(storiesActions, dispatch)
  };
}


export default withRouter(connect(mapStateToProps, mapDispatchToProps)(HotPage));