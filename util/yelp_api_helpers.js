const { IncomingWebhook } = require('@slack/client');

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
    "thumb_url": restaurant.image_url
  }
);

const restaurantMessage = (businesses, webHook) => {
  const webHookUrl = new IncomingWebhook(webHook);
  const test = {
    "attachments": [
      buildRestaurantMessage(businesses[0], 0),
      buildRestaurantMessage(businesses[1], 1),
      buildRestaurantMessage(businesses[2], 2)
    ]
  };

  webHookUrl.send(test, function (err, res) {
    if (err) {
      console.log('Error:', err);
    } else {
      console.log('Message successfully sent');
    }
  });
};

const selectRandomRestaurants = (businesses) => {
  const arr = [];
  while (arr.length < 3) {
    var randomNum = Math.floor(Math.random() * businesses.length);
    if (arr.indexOf(randomNum) > -1 || arr.includes(businesses[randomNum])) continue;
    arr.push(businesses[randomNum]);
  }

  return arr;
};


module.exports = {
  metersToMiles,
  milesToMeters,
  restaurantMessage,
  selectRandomRestaurants
};