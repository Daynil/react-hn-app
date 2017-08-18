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
const fs = require('fs');
const bestStoriesCache = require('./debug/bestStoriesCache.json');

const app = express();

let production = process.env.NODE_ENV === 'production';
let port = process.env.PORT || 3001;
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

app.get('/api/stories', async (req, res) => {
  //return res.status(200).json(bestStoriesCache);

  try {
    let bestStoryIds = await fetch('https://hacker-news.firebaseio.com/v0/topstories.json');
    bestStoryIds = await bestStoryIds.json();
    let best30Ids = bestStoryIds.slice(0, 30);
    let bestStoryPromises = best30Ids.map(async bestStoryId => {
      let bestStory = await fetch(`https://hacker-news.firebaseio.com/v0/item/${bestStoryId}.json`);
      bestStory = await bestStory.json();
      return bestStory;
    });
    let bestStoryArray = await Promise.all(bestStoryPromises);
    //fs.writeFile('./debugCache.json', JSON.stringify(bestStoryArray), 'utf-8')
    res.status(200).json(bestStoryArray);
  } catch (error) {
    console.log(error);
    res.status(500).json({error: error});
  }

});

/** CRA serves front end in development */
if (production) {
  app.use(compress());
  app.use( express.static( path.join(__dirname, './dist') ));
  app.use('/scripts', express.static( path.join(__dirname, './node_modules') ));

  app.get('*', (req, res) => {
    res.sendFile(path.resolve(__dirname, '../build', 'index.html'));
  });
}

app.listen(port, () => {
  console.log(`Listening on port ${port}...`.green);
});