'use strict';
require('dotenv').config();
const express = require('express');
const request = require('request');
const yelp = require('yelp-fusion');
const bodyParser = require('body-parser');
const axios = require('axios');
const qs = require('querystring');
const slackTestFunction = require('./routes.js');
const debug = require('debug')('yelp_on_slack:server');
// const { createMessageAdapter } = require('@slack/interactive-messages');
const client = yelp.client(process.env.YELP_KEY);

// const slackInteractions = createMessageAdapter(process.env.SLACK_VERIFICATION_TOKEN);

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
// app.use('/posttest', slackInteractions.expressMiddleware());
app.set('port', process.env.PORT || 5000);

app.get('/', (req, res) => {
  res.json({ hello: "world" });
});

app.get('/auth', (req, res) => {
  const options = {
    url: 'https://slack.com/api/oauth.access?code=' +
      req.query.code +
      '&client_id=' + process.env.CLIENT_ID +
      '&client_secret=' + process.env.CLIENT_SECRET,
    method: 'GET'
  };

  request(options, (error, response, body) => {
    const JSONresponse = JSON.parse(body);
    if (!JSONresponse.ok) {
      console.log(JSONresponse);
      res.send("Error encountered: \n" + JSON.stringify(JSONresponse)).status(200).end()
    } else {
      console.log(JSONresponse);
      // res.send("Success!")
      res.send(JSONresponse);
    }
  });
});

// SLACK
app.get('/slacktest', slackTestFunction);

app.post('/posttest', (req, res) => {
  const { token, text, trigger_id} = req.body;

  if (token === process.env.SLACK_VERIFICATION_TOKEN) {
    const dialog = {
      token: process.env.SLACK_ACCESS_TOKEN,
      trigger_id, 
      dialog: JSON.stringify({
        title: 'Create a Poll',
        callback_id: 'submit-form',
        submit_label: 'Submit',
        elements: [
          {
            label: 'Price',
            type: 'select',
            name: 'price_list',
            options: [
              {
                label: "$",
                value: "one$" 
              },
              {
                label: "$$",
                value: "two$"
              },
              {
                label: "$$$",
                value: "three$"
              },
              {
                label: '$$$$',
                value: 'four$'
              }
            ]
          },
          {
            label: 'Distance',
            type: 'select',
            name: 'distance_range',
            options: [
              {
                label: "0.5mi",
                value: 0.5
              },
              {
                label: "1.0mi",
                value: 1.0
              },
              {
                label: "1.5mi",
                value: 1.5
              },
              {
                label: "2.0mi",
                value: 2.0
              }
            ]
          },
          {
            label: 'Location',
            name: "location",
            type: 'text',
            placeholder: 'Starting Location'
          }
        ]
      })
    };

    axios.post('https://slack.com/api/dialog.open', qs.stringify(dialog))
      .then((result) => {
        debug('dialog.open: %o', result.data);
        res.send('All done');
      }).catch((err) => {
        debug('dialog.open call failed: $o', err);
        res.sendStatus(501);
      });
  } else {
    debug('Verification token mismatch');
    res.sendStatus(400);
  }
});

// Using localStorage on server to store tokens but will probably want to use a real DB (MongoDB)
const storage = require('node-persist');
storage.initSync();

let apiUrl = 'https://slack.com/api';

app.get('/auth2', function (req, res) {
  if (!req.query.code) { // access denied
    console.log('Access denied');
    return;
  }
  const data = {
    form: {
      client_id: process.env.SLACK_CLIENT_ID,
      client_secret: process.env.SLACK_CLIENT_SECRET,
      code: req.query.code
    }
  };
  request.post(apiUrl + '/oauth.access', data, function (error, response, body) {
    if (!error && response.statusCode === 200) {

      // Get an auth token (and store the team_id / token)
      // storage defined above takes place of a DB that we would implement in the future (MongoDB)
      // Would use MongoDB.insert method
      storage.setItemSync(JSON.parse(body).team_id, JSON.parse(body).access_token);

      res.sendStatus(200);

      // Show a nicer web page or redirect to Slack, instead of just giving a status 200
      //res.redirect(__dirname + "/public/success.html");
    }
  });
});



// slackInteractions.action({ type: 'button' }, (payload, respond) => {
//   // console.log(`The user ${payload.user.name} in team ${payload.team.domain} pressed a button`);
//   // console.log(payload);
//   respond({
//     text: 'Thanks for pressing the button, idiot.'
//   });

//   const reply = payload.original_message;
//   delete reply.attachments[0].actions;
//   return reply;
// });
// // app.post('/posttest', slackResponseFunction);


// YELP
app.get('/userrequest', (req, res) => {

  client.search({
    term: 'indian',
    price: [1, 2], // 1 or 2 dollar signs
    location: 'soma, san francisco',
  }).then(response => {
    const filteredResults = response.jsonBody.businesses;

    // logs to server console
    filteredResults.forEach(bus => console.log(bus.name)); 
    res.json(filteredResults);
  });

});

app.listen(app.get('port'), () => {
  console.log('App is listening on port ' + app.get('port'));
});