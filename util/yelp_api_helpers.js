const { IncomingWebhook } = require('@slack/client');
const imageUrlBuilder = require('./location_pins');
const request = require('request');
const axios = require('axios');

const metersToMiles = (meters) => (meters * 0.0006).toFixed(1);
const milesToMeters = (miles) => (miles * 1609.34).toFixed();

const ICON_HASH = {
  0: ":fire:",
  1: ":thumbsup:",
  2: ":star:"
};

const buildRestaurantMessage = (restaurant, num) => (
  {
    "fields": [{
      "title": "Type",
      "value": restaurant.categories[0].title,
      "short": true
    },
    {
      "title": "Price",
      "value": restaurant.price,
      "short": true
    },
    { 
      "title": "Reviews",
      "value": restaurant.review_count,
      "short": true
    },
    {
      "title": "Avg Rating",
      "value": restaurant.rating,
      "short": true
    },
    {
      "title": "Distance (mi.)",
      "value": metersToMiles(restaurant.distance),
      "short": true
    }, {
      "title": `Vote with ${ICON_HASH[num]}`,
      "value": '',
      "short": true
    }
    ],
    "title": restaurant.name,
    "title_link": restaurant.url,
    "thumb_url": restaurant.image_url,
    "color": "#ff0000"
  }
);

const restaurantMessage = (businesses, webHook) => {
  const webHookUrl = new IncomingWebhook(webHook);
  const locations = [businesses[0].coordinates, businesses[1].coordinates, businesses[2].coordinates];

  const options = {
    uri: 'https://api.imgur.com/3/image',
    method: 'POST',
    headers: {
      "Authorization": "Client-ID " + process.env.IMGUR_CLIENT_ID
    },
    formData: {
      "image": imageUrlBuilder(locations)
    }
  };

  request(options, (error, response, body) => {
    const JSONresponse = JSON.parse(body);
    if (JSONresponse.success) {
      const imageAttachment = {
        "title": "Map:",
        "image_url": JSONresponse.data.link,
        "color": "#ff0000"
      };
      const restaurantPoll = {
        "text": "Where should we go eat?",
        "attachments": [
          buildRestaurantMessage(businesses[0], 0),
          buildRestaurantMessage(businesses[1], 1),
          buildRestaurantMessage(businesses[2], 2),
          imageAttachment
        ]
      };

      webHookUrl.send(restaurantPoll, function (err, res) {
        if (err) {
          console.log('Error:', err);
        } else {
          console.log('Message successfully sent');
        }
      });
    } else {
      console.log(JSONresponse);
      console.log(JSONresponse.status);
    }
  });

};

const selectRandomRestaurants = (businesses) => {
  const arr = [];
  while (arr.length < 3) {
    const randomNum = Math.floor(Math.random() * businesses.length);

    if (arr.indexOf(randomNum) > -1 || arr.includes(businesses[randomNum])) continue;
    arr.push(businesses[randomNum]);
  }

  return arr;
};

const setClientObject = (body) => {
  const milesDistance = body.submission['distance'] || 5;

  return {
    term: body.submission['search'] || 'restaurant',
    location: body.submission['location'],
    price: body.submission['price'],
    sort_by: 'rating',
    limit: 30,
    radius: milesToMeters(milesDistance)
  };
};


module.exports = {
  metersToMiles,
  milesToMeters,
  restaurantMessage,
  selectRandomRestaurants,
  setClientObject
};