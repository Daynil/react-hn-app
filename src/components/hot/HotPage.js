import React from 'react';
import {Link} from 'react-router-dom';

class HotPage extends React.Component {
  render() {
    return (
      <div>
        This is the hot page.
        <Link to="top">Goto top page</Link>
      </div>
    );
  }
}

export default HotPage;