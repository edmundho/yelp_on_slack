const metersToMiles = (meters) => (meters * 0.0006).toFixed(1);
const ICON_HASH = {
  0: ":fire:",
  1: ":thumbsup:",
  2: ":star:"
};

module.exports = {
  metersToMiles: (meters) => (meters * 0.0006).toFixed(1),
  buildRestaurantMessage: (restaurant, num) => (
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
  )
};