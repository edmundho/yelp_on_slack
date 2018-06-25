'use strict';
require('dotenv').config();
const express = require('express');
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
// extended: true allows nested objects
app.use(bodyParser.urlencoded({ extended: true }));
// specifying that we want json to be used
app.use(bodyParser.json());
// app.use('/posttest', slackInteractions.expressMiddleware());
app.set('port', process.env.PORT || 5000);


app.get('/', (req, res) => {

  res.json({ hello: "world" });
});

// app.get('/auth', (req, res) => {

// })
// SLACK
app.get('/slacktest', slackTestFunction);
// /yack slash command send HTTP post request to this url. We send back a dialog window.
app.post('/posttest', (req, res) => {
  // trigger id lets us match up our response to whatever action triggered it
  const { token, text, trigger_id} = req.body;
  // this topmost token refers to the token sent by the request specifying that it came from slack
  if (token === process.env.SLACK_VERIFICATION_TOKEN) {
    // dialog object
    const dialog = {
      // token that allows us to take actions on behalf of the workplace/user
      token: process.env.SLACK_ACCESS_TOKEN,
      trigger_id, 
      // convert to a json string
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
    // send an http post request to open the dialog, and we pass the dialog
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