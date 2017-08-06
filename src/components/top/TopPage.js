import React from 'react';
import {Link} from 'react-router-dom';

class TopPage extends React.Component {
  render() {
    return (
      <div>
        This is the top page.
        <Link to="/">Goto hot page</Link>
      </div>
    );
  }
}

export default TopPage;