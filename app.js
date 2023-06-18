const express = require('express');
const bodyParser = require('body-parser');
// const mongodb = require('./models/connect');
const createError = require('http-errors');

require('dotenv').config();
require('./db/init_mongodb');

const port = process.env.PORT || 8080;
const app = express();

app
  .use(bodyParser.json())
  .use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader(
      'Access-Control-Allow-Headers',
      'Origin, X-Requested-With, Content-Type, Accept, Z-Key'
    );
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
    next();
  })
  .use(express.json())
  .use(express.urlencoded({ extended: true }))
  .use('/', require('./routes'))
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
