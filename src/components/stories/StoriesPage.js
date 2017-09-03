import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as storiesActions from '../../actions/storiesActions';
import {withRouter} from 'react-router-dom';

import Button from 'material-ui/Button';

import './StoriesPage.css';
import StoryCard from '../common/StoryCard';
import {selectStories} from '../../utilities/utilities';

class StoriesPage extends React.Component {

  loadMore = () => {
    const type = this.props.match.params.type;
    this.props.actions.incrementList(type);
  }

  render() {
    if (!this.props.stories || this.props.loading) return null;
    const storyCards = this.props.stories.map((story, i) => {
      return <StoryCard key={i} story={story}/>
    });

    return (
      <div>
        {storyCards}
        <Button raised color="primary" onClick={this.loadMore}>
          Load More
        </Button>
      </div>
    );
  }
}

function mapStateToProps(state, ownProps) {
  const type = ownProps.match.params.type;
  let stories = [];
  if (type && state.stories.length) {
    stories = selectStories(state, type);
  }

  return {stories, loading: state.ajaxInfo.ajaxInProgress};
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(storiesActions, dispatch)
  };
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(StoriesPage));