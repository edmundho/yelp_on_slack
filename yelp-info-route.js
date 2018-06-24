const express = require('express');
const yelp = require('yelp-fusion');
const {
  IncomingWebhook,
  WebClient
} = require('@slack/client');

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

const PRICE_HASH = {
  "$": "1",
  "$$": "2",
  "$$$": "3",
  "$$$$": "4"
};

app.get('/restaurants', function (req, res) {
  client.search({
    term: 'asian',
    location: 'soma, san francisco',
    price: 4,
    sort_by: 'rating'
  }).then(response => {
    const businesses = response.jsonBody.businesses.slice(0, 3);
    restaurantMessage(businesses);
    res.send('Success!');
  });
});

const restaurantMessage = (businesses) => {
  const test = {
    "attachments": [{
      "fields": [{
          "title": "Type",
          "value": businesses[0].categories[0].title,
          "short": true
        },
        {
          "title": "Price",
          "value": businesses[0].price,
          "short": true
        },
        {
          "title": "Reviews",
          "value": businesses[0].review_count,
          "short": true
        },
        {
          "title": "Avg Rating",
          "value": businesses[0].rating,
          "short": true
        },
      ],
      "title": businesses[0].name,
      "title_link": businesses[0].url,
      "author_name": "Yack Team",
      "author_icon": "http://a.slack-edge.com/7f18/img/api/homepage_custom_integrations-2x.png",
      "image_url": businesses[0].image_url
    }]
  };

  const secondBus = {
    "attachments": [{
      "fields": [{
          "title": "Type",
          "value": businesses[1].categories[0].title,
          "short": true
        },
        {
          "title": "Price",
          "value": businesses[1].price,
          "short": true
        },
        {
          "title": "Reviews",
          "value": businesses[1].review_count,
          "short": true
        },
        {
          "title": "Avg Rating",
          "value": businesses[1].rating,
          "short": true
        },
      ],
      "title": businesses[1].name,
      "title_link": businesses[1].url,
      "author_name": "Yack Team",
      "author_icon": "http://a.slack-edge.com/7f18/img/api/homepage_custom_integrations-2x.png",
      "image_url": businesses[1].image_url
    }]
  };

  const thirdBus = {
    "attachments": [{
      "fields": [{
          "title": "Type",
          "value": businesses[2].categories[0].title,
          "short": true
        },
        {
          "title": "Price",
          "value": businesses[2].price,
          "short": true
        },
        {
          "title": "Reviews",
          "value": businesses[2].review_count,
          "short": true
        },
        {
          "title": "Avg Rating",
          "value": businesses[2].rating,
          "short": true
        },
      ],
      "title": businesses[2].name,
      "title_link": businesses[2].url,
      "author_name": "Yack Team",
      "author_icon": "http://a.slack-edge.com/7f18/img/api/homepage_custom_integrations-2x.png",
      "image_url": businesses[2].image_url
    }]
  };

  webHook.send(test, function (err, res) {
    if (err) {
      console.log('Error:', err);
    } else {
      console.log('Message successfully sent');
    }
  });
  webHook.send(secondBus, function (err, res) {
    if (err) {
      console.log('Error:', err);
    } else {
      console.log('Message successfully sent');
    }
  });
  webHook.send(thirdBus, function (err, res) {
    if (err) {
      console.log('Error:', err);
    } else {
      console.log('Message successfully sent');
    }
  });
};
