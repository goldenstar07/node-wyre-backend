const functions = require('firebase-functions');
const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();
const { apiRouter } = require('./api');

app.use(cors({ origin: true }));
app.use(express.static('public'));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

app.use('/', apiRouter);
app.use((req, res, next) => {
  next(new APIError('API not found', 404))
})

app.use((err, req, res, next1) => {
  console.error(err);
  res.status(err.status || 500).json({
    message: err.message
  });
});

exports.wyre = functions.https.onRequest(app);
