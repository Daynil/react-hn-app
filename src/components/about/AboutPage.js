import React from 'react';

import './AboutPage.css';

const AboutPage = () => {

  return (
    <div className="about">
      <h2>An alternate front end implementation of <a href="https://news.ycombinator.com/news" target="_blank">hacker news</a>.</h2>
      <h3>By <a href="https://github.com/Daynil/react-hn-app" target="_blank">Danny Libin</a></h3>
      <b>Technologies used:</b>
      <ul>
        <li>React</li>
        <li>create-react-app</li>
        <li>React-router</li>
        <li>Redux</li>
        <li>material-ui</li>
        <li>express</li>
      </ul>
      <p>This app could just as well have been implemented without either express or redux.</p>
      <p>My intention was to put every piece of the web application puzzle with react together to build it as practice.</p>
    </div>
  );
};

export default AboutPage;