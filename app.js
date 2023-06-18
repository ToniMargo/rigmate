const express = require('express');
const bodyParser = require('body-parser');
const createError = require('http-errors');

require('dotenv').config();
require('./db/init_mongodb');

const port = process.env.PORT || 8080;
const app = express();

app
  .use(bodyParser.json())
  .use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    next();
  })
  .use('/', require('./routes'))
  .use(express.urlencoded({ extended: true }))
  .use(async (req, res, next) => {
    next(createError.NotFound());
  })
  .use((err, req, res, next) => {
    res.status(err.status || 500);
    res.send({
      error: {
        status: err.status || 500,
        message: err.message
      }
    });
  })
  .listen(port, () => {
    console.log(`Server running on port ${port}`);

    // mongodb.initDb((err) => {
    //   if (err) {
    //     console.log(err);
    //   } else {
    //     app.listen(port);
    //     console.log(`Connected to DB and listening on ${port}`);
    //   }
  });
