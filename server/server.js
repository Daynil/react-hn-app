const path = require('path');

const express = require('express');
const morgan = require('morgan');
const compress = require('compression');
const bodyParser = require('body-parser');
const cors = require('cors');
const colors = require('colors');
const fetch = require('node-fetch');

require('dotenv').load();

// DEBUG
//const fs = require('fs');
//const bestStoriesCache = require('./debug/bestStoriesCache.json');

const app = express();

let production = process.env.NODE_ENV === 'production';
let port = process.env.PORT || 3009;
let verboseLogging = false;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(morgan('dev', {
  skip: (req, res) => {
    if (verboseLogging) return false;
    else return req.baseUrl === '/scripts';
  }
}));

/**
 * Get a list of story IDs in a specified order
 * @param type 'top', 'new' or 'best' ordering
 * @return list of 200 IDs
 */
app.get('/api/listorder/:type', async (req, res) => {
  const sortType = req.params.type;

  try {
    let storyIds = await fetch(`https://hacker-news.firebaseio.com/v0/${sortType}stories.json`);
    storyIds = await storyIds.json();
    //fs.writeFile('./debugCache.json', JSON.stringify(bestStoryArray), 'utf-8')
    res.status(200).json(storyIds);
  } catch (error) {
    console.log(error);
    res.status(500).json({error: error});
  }

});

/**
 * Get story details for a list of storyIds
 * @param storyids a list of storyIDs we need full info for
 * @return full list of info 
 */
app.post('/api/stories', async (req, res) => {
  const storyIds = req.body;
  try {
    let storyPromises = storyIds.map(async storyId => {
      let story = await fetch(`http://hn.algolia.com/api/v1/items/${storyId}`);
      story = await story.json();
      return story;
    });
    let storyArray = await Promise.all(storyPromises);
    //fs.writeFile('./debugCache.json', JSON.stringify(storyArray), 'utf-8')
    res.status(200).json(storyArray);
  } catch (error) {
    console.log(error);
    res.status(500).json({error: error});
  }
});

/** CRA serves front end in development */
if (production) {
  app.use(compress());
  app.use( express.static( path.join(__dirname, '../build') ));
  app.use('/scripts', express.static( path.join(__dirname, './node_modules') ));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../build', 'index.html'));
  });
}

app.listen(port, () => {
  console.log(`Listening on port ${port}...`.green);
});