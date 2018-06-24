'use strict';

const express = require('express');
const yelp = require('yelp-fusion');
const bodyParser = require('body-parser');
const slackTestFunction = require('./routes.js');
const client = yelp.client("BJY8o0hC_pZdzuFqjbGW7cdeZR-TWCULNZnzzle-X7OchaPm_4fxVufMS-GkjpubE75qvcr4Qf6Wm5HvMHgGwBRSSQUVj7kXD6hBmEa8wnu6FIa0lFssF2NWIm4tW3Yx");
const { createMessageAdapter } = require('@slack/interactive-messages');

process.env.SLACK_VERIFICATION_TOKEN = 'hymKkILsxWJZWZ5g9JTSJt3X';

const slackInteractions = createMessageAdapter(process.env.SLACK_VERIFICATION_TOKEN);

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use('/posttest', slackInteractions.expressMiddleware());
app.set('port', process.env.PORT || 5000);


app.get('/', (req, res) => {

  res.json({ hello: "world" });
});
// SLACK
app.get('/slacktest', slackTestFunction);

slackInteractions.action({ type: 'button' }, (payload, respond) => {
  console.log(`The user ${payload.user.name} in team ${payload.team.domain} pressed a button`);
  console.log(payload);
  respond({
    text: 'Thanks for pressing the button, idiot.'
  });

  const reply = payload.original_message;
  delete reply.attachments[0].actions;
  return reply;
});
// app.post('/posttest', slackResponseFunction);


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