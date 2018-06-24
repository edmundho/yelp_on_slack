const express = require('express');
// const { WebClient } = require('@slack/client');
const { IncomingWebhook } = require('@slack/client');
const app = express();


module.exports = function(req, response){

  const SLACK_WEBHOOK_URL = "https://hooks.slack.com/services/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";
  // const url = process.env.SLACK_WEBHOOK_URL;
  const webhook = new IncomingWebhook(SLACK_WEBHOOK_URL);

  const object = {
    "text": "Time to decide where to eat!",
    "response_type": "in_channel",
    "attachments": [
      {
        "text": "What's your price range?",
        "fallback": "If you could read this, you'd be choosing an awesome meal for the day.",
        "color": "##6441a5 ",
        "attachment_type": "default",
        "callback_id": "price_selection",
        "actions": [
          {
            "name": "price_list",
            "text": "Price range?",
            "type": "select",
            "options": [
              {
                "text": "$",
                "value": "one$"
              },
              {
                "text": "$$",
                "value": "two$"
              },
              {
                "text": "$$$",
                "value": "three$"
              },
              {
                "text": "$$$$",
                "value": "four$"
              }
            ]
          }
        ]
      },
      {
        "text": "What's the farthest you're willing to go?",
        "fallback": "If you could read this, you'd be choosing an awesome meal for the day.",
        "color": "##6441a5 ",
        "attachment_type": "default",
        "callback_id": "distance_selection",
        "actions": [
          {
            "name": "distance_list",
            "text": "Distance",
            "type": "select",
            "options": [
              {
                "text": "0.5mi",
                "value": 0.5
              },
              {
                "text": "1.0mi",
                "value": 1.0
              },
              {
                "text": "1.5mi",
                "value": 1.5
              },
              {
                "text": "2.0mi",
                "value": 2
              }
            ]
          }
        ]
      },
      {
        "fallback": "Shame... buttons aren't supported in this land",
        "callback_id": "form_buttons",
        "color": "#3AA3E3",
        "attachment_type": "default",
        "actions": [
          {
            "name": "cancel",
            "text": "Cancel",
            "type": "button",
            "value": "cancel",
            "style": "danger"
          },
          {
            "name": "send",
            "text": "Send",
            "type": "button",
            "value": "send",
            "style": "primary"
          }
        ]
      }
    ]
  };

  // Send simple text to the webhook channel
  webhook.send(object, function (err, res) {
    if (err) {
      console.log('Error:', err);
    } else {
      console.log('Message sent: ', res);
      response.send("All good");
    }
  });
};
