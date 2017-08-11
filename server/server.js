const path = require('path');

const express = require('express');
const morgan = require('morgan');
const compress = require('compression');
const bodyParser = require('body-parser');
const cors = require('cors');
const colors = require('colors');

require('dotenv').load();

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

app.get('/api/stories', (req, res) => {
  let stories = [
    {
      "by" : "dhouston",
      "descendants" : 71,
      "id" : 8863,
      "kids" : [ 8952, 9224, 8917, 8884, 8887, 8943, 8869, 8958, 9005, 9671, 8940, 9067, 8908, 9055, 8865, 8881, 8872, 8873, 8955, 10403, 8903, 8928, 9125, 8998, 8901, 8902, 8907, 8894, 8878, 8870, 8980, 8934, 8876 ],
      "score" : 111,
      "time" : 1175714200,
      "title" : "My YC app: Dropbox - Throw away your USB drive",
      "type" : "story",
      "url" : "http://www.getdropbox.com/u/2/screencast.html"
    },
    {
      "by" : "person1",
      "descendants" : 71,
      "id" : 8863,
      "kids" : [ 8952, 9224, 8917, 8884, 8887, 8943, 8869, 8958, 9005, 9671, 8940, 9067, 8908, 9055, 8865, 8881, 8872, 8873, 8955, 10403, 8903, 8928, 9125, 8998, 8901, 8902, 8907, 8894, 8878, 8870, 8980, 8934, 8876 ],
      "score" : 345,
      "time" : 1175714200,
      "title" : "This story be the bloody coolest donchakno",
      "type" : "story",
      "url" : "http://www.google.com/"
    },
    {
      "by" : "dadams",
      "descendants" : 71,
      "id" : 8863,
      "kids" : [ 8952, 9224, 8917, 8884, 8887, 8943, 8869, 8958, 9005, 9671, 8940, 9067, 8908, 9055, 8865, 8881, 8872, 8873, 8955, 10403, 8903, 8928, 9125, 8998, 8901, 8902, 8907, 8894, 8878, 8870, 8980, 8934, 8876 ],
      "score" : 42,
      "time" : 1175714200,
      "title" : "This is the one fo sho.",
      "type" : "story",
      "url" : "http://www.google.com/"
    },
  ];

  res.status(200).json(stories);
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