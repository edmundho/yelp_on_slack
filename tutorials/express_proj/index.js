const express = require('express');
const yelp = require('yelp-fusion');
const client = yelp.client("BJY8o0hC_pZdzuFqjbGW7cdeZR-TWCULNZnzzle-X7OchaPm_4fxVufMS-GkjpubE75qvcr4Qf6Wm5HvMHgGwBRSSQUVj7kXD6hBmEa8wnu6FIa0lFssF2NWIm4tW3Yx");

const app = express();

const dummyObj = {
  height: 1293,
  width: 654654,
  volume: 43958,
  area: 958,
  time: 580000,
};

app.get('/', (req, res) => {
  
  res.set('Content-Type', 'text/html');
  res.send(dummyObj);
  console.log('more stuff');
  
});

app.get('/userrequest', (req, res) => {

  client.search({
    term: 'indian',
    location: 'soma, san francisco',
  }).then(response => {
    const hellaExpensive = response.jsonBody.businesses.filter(business => {
      // if (business.price === '$$$$')
      // return business;
      if (business.price === '$' || business.price === '$$')
      return business;
    });
    // res.json(response.jsonBody);
    hellaExpensive.forEach(bus => console.log(bus.name));
    res.json(hellaExpensive);
    
  });

});

const server = app.listen(3001, () => {
  const host = server.address().address;
  const port = server.address().port;
  
  console.log(`app running at ${host}:${port}`);
});