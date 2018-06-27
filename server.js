'use strict';
require('dotenv').config();
const SlackAPIUtil = require('./util/slack_api_helpers');
const YelpAPIUtil = require('./util/yelp_api_helpers');
const express = require('express');

//Set up mongoose connection
const mongoose = require('mongoose');
mongoose.connect(process.env.MONGO);
const Channel = require('./models/channel');
mongoose.Promise = global.Promise;
const db = mongoose.connection;
db.on('error', console.error.bind(console, 'MongoDB connection error:'));
const request = require('request');
const yelp = require('yelp-fusion');
const bodyParser = require('body-parser');
const axios = require('axios');
const qs = require('querystring');
const debug = require('debug')('yelp_on_slack:server');
const client = yelp.client(process.env.YELP_KEY);

const app = express();
app.use(express.static(__dirname));

// extended: true allows nested objects
app.use(bodyParser.urlencoded({ extended: true }));
// specifying that we want json to be used
app.use(bodyParser.json());

app.set('port', process.env.PORT || 3000);

app.get('/auth', (req, res) => {
  // when a team installs our app on their workspace by pressing our "add to slack" button, they will get re-directed to our /auth route with a code they get from the oauth.access website.

  const options = {
    uri: 'https://slack.com/api/oauth.access?code=' +
      req.query.code +
      '&client_id=' + process.env.SLACK_CLIENT_ID +
      '&client_secret=' + process.env.SLACK_CLIENT_SECRET,
    method: 'GET'
  };

  // we then take the code, put it in the above options object, and then make a new request to Slack, 
  // which authorizes our app to do stuff with the workspace. 
  // this is the only time we get access to the workspace's webhook url, slack access token, workspace name, etc. via the body, which we store in JSONresponse.
  request(options, (error, response, body) => {
    const JSONresponse = JSON.parse(body);
    if (!JSONresponse.ok) {
      console.log(JSONresponse);
      res.send("Error encountered: \n" + JSON.stringify(JSONresponse)).status(200).end();
    } else {
      // extract workspace information from JSONresponse after workspace installs our app
      const channelAccessToken = JSONresponse.access_token;
      const channelId = JSONresponse.incoming_webhook.channel_id;
      const webHookUrl = JSONresponse.incoming_webhook.url;
      const conditions = { channel_id: channelId};
      const newEntry = { channel_id: channelId, access_token: channelAccessToken, webhook_url: webHookUrl };
      // if channel already exists, update it with new info. if it doesn't, create it
      Channel.findOneAndUpdate(conditions, newEntry, {upsert: true}, function(err){
        if (err) return res.send(500, {error: err});
        // redirect to home/splash page upon successful authorization
        return res.redirect('https://yelponslack.herokuapp.com');
      });
    }
  });
});

// SLACK

// /yack slash command sends HTTP post request to this url. We send back a dialog window.
app.post('/posttest', (req, res) => {

  // trigger id lets us match up our response to whatever action triggered it
  const { token, channel_id, trigger_id} = req.body;
  let slackAccessToken;
  // search our database for the right channel
  Channel.findOne({ channel_id: channel_id}).then(channel => {
    slackAccessToken = channel.access_token;
    // this topmost token refers to the token sent by the request specifying that it came from slack
    if (token === process.env.SLACK_VERIFICATION_TOKEN) {
      // dialog object
    const dialog = {
      // token that allows us to take actions on behalf of the workplace/user
      token: slackAccessToken,
      trigger_id, 
      // dialog form
      dialog: SlackAPIUtil.form
    };
    // send an http post request to open the dialog, and we pass the dialog
    axios.post('https://slack.com/api/dialog.open', qs.stringify(dialog))
      .then((result) => {
        debug('dialog.open: %o', result.data);
        res.send(JSON.stringify(req.body));
      }).catch((error) => {
        debug('dialog.open call failed: $o', error);
        res.sendStatus(501);
      });
  } else {
    debug('Verification token mismatch');
    res.sendStatus(400);
  }
  }, () => {
    res.sendStatus(505);
  });
});

//route to accept button-presses and form submissions
app.post('/interactive-component', (req, res) => {
  const body = JSON.parse(req.body.payload);
  Channel.findOne({channel_id: body.channel.id}).then( channel => {
    // check for verification token
    if (body.token === process.env.SLACK_VERIFICATION_TOKEN) {
      debug(`Form submission received: ${body.submission.trigger_id}`);
  
      // we send an empty response because slack requires us to respond within 3 seconds or else timeout
      res.send('');
      const milesDistance = body.submission['distance'] || 5;
      // ping yelp api with our search terms from dialog form
      client.search({
        term: body.submission['search'] || 'restaurant',
        location: body.submission['location'],
        price: body.submission['price'] || '',
        sort_by: 'rating',
        limit: 30,
        radius: YelpAPIUtil.milesToMeters(milesDistance)
      }).then(restaurants => {
        // select random, unique restaurants from payload
        const businesses = YelpAPIUtil.selectRandomRestaurants(restaurants.jsonBody.businesses);
        // send poll to channel that made request
        YelpAPIUtil.restaurantMessage(businesses, channel.webhook_url);
      }, (err) => {
        res.sendStatus('Not enough restaurants');
      });
      
    } else {
      debug("Token mismatch");
      res.sendStatus(500);
      }
    }, () => {
      res.sendStatus(505);
    }
  );

});

app.listen(app.get('port'), () => {
  console.log('App is listening on port ' + app.get('port'));
});