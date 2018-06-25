const YelpAPIUtil = require('./util/yelp_api_helpers');
const request = require('request');
const express = require('express');
const yelp = require('yelp-fusion');
const {
  IncomingWebhook,
  WebClient
} = require('@slack/client');

const PRICE_HASH = {
  "$": "1",
  "$$": "2",
  "$$$": "3",
  "$$$$": "4"
};

const client = yelp.client("BJY8o0hC_pZdzuFqjbGW7cdeZR-TWCULNZnzzle-X7OchaPm_4fxVufMS-GkjpubE75qvcr4Qf6Wm5HvMHgGwBRSSQUVj7kXD6hBmEa8wnu6FIa0lFssF2NWIm4tW3Yx");
const app = express();

const server = app.listen(3000, () => {
  const host = server.address().address;
  const port = server.address().port;
  console.log(`app running at ${host}:${port}`);
});

const SLACK_WEBHOOK_URL = "https://hooks.slack.com/services/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";
const webHook = new IncomingWebhook(SLACK_WEBHOOK_URL);

app.get('/', (req, res) => {
  res.json({
    hello: "test"
  });
});


app.get('/restaurants', function (req, res) {
  client.search({
    term: 'asian',
    location: '825 Battery St. San Francisco',
    price: 4,
    sort_by: 'rating'
  }).then(response => {
    console.log(response.jsonBody.businesses);
    const businesses = response.jsonBody.businesses.slice(0, 3);
    restaurantMessage(businesses);
    res.send('Success!');
  });
});

const restaurantMessage = (businesses) => {
  const test = {
    "attachments": [
      YelpAPIUtil.buildRestaurantMessage(businesses[0], 0), 
      YelpAPIUtil.buildRestaurantMessage(businesses[1], 1), 
      YelpAPIUtil.buildRestaurantMessage(businesses[2], 2)
    ]
  };

  webHook.send(test, function (err, res) {
    if (err) {
      console.log('Error:', err);
    } else {
      console.log('Message successfully sent');
    }
  });
};

// Using localStorage on server to store tokens but will probably want to use a real DB (MongoDB)
// const storage = require('node-persist');
// storage.initSync();

// let apiUrl = 'https://slack.com/api';

// app.get('/auth2', function (req, res) {
//   if (!req.query.code) { // access denied
//     console.log('Access denied');
//     return;
//   }
//   const data = {
//     form: {
//       client_id: process.env.SLACK_CLIENT_ID,
//       client_secret: process.env.SLACK_CLIENT_SECRET,
//       code: req.query.code
//     }
//   };
//   request.post(apiUrl + '/oauth.access', data, function (error, response, body) {
//     if (!error && response.statusCode === 200) {

//       // Get an auth token (and store the team_id / token)
//       // storage defined above takes place of a DB that we would implement in the future (MongoDB)
//       // Would use MongoDB.insert method
//       storage.setItemSync(JSON.parse(body).team_id, JSON.parse(body).access_token);

//       res.sendStatus(200);

//       // Show a nicer web page or redirect to Slack, instead of just giving a status 200
//       //res.redirect(__dirname + "/public/success.html");
//     }
//   });
// });