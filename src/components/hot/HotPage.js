import React from 'react';
import {connect} from 'react-redux';
import {bindActionCreators} from 'redux';
import * as storiesActions from '../../actions/storiesActions';
import {Link, withRouter} from 'react-router-dom';

import './HotePage.css';
import StoryCard from '../common/StoryCard';

class HotPage extends React.Component {

  render() {
    const storyCards = this.props.stories.map((story, i) => {
      return <StoryCard key={i} story={story}/>
    });

    return (
      <div>
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