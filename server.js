const express = require('express');
const yelp = require('yelp-fusion');
const slackTestFunction = require('./routes.js');
const client = yelp.client("BJY8o0hC_pZdzuFqjbGW7cdeZR-TWCULNZnzzle-X7OchaPm_4fxVufMS-GkjpubE75qvcr4Qf6Wm5HvMHgGwBRSSQUVj7kXD6hBmEa8wnu6FIa0lFssF2NWIm4tW3Yx");

const app = express();

app.set('port', process.env.PORT || 5000);

app.get('/', (req, res) => {

  res.json({ hello: "world" });
});

app.get('/slacktest', slackTestFunction);

app.get('/userrequest', (req, res) => {

  client.search({
    term: 'indian',
    price: 2,
    location: 'soma, san francisco',
  }).then(response => {
    const filteredResults = response.jsonBody.businesses;
    // const hellaExpensive = response.jsonBody.businesses.filter(business => {
      // if (business.price === '$$$$')
      // return business;
      // if (business.price === '$')
      // if (business.price === '$' || business.price === '$$')
      // return business;
    // });
    // res.json(response.jsonBody);
    filteredResults.forEach(bus => console.log(bus.name));
    res.json(filteredResults);
    
  });

});

app.listen(app.get('port'), function () {
  console.log('App is listening on port ' + app.get('port'));
});