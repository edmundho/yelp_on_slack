const express = require('express');
const yelp = require('yelp-fusion');
// import express from 'express';
// import yelp from 'yelp-fusion';

const client = yelp.client("BJY8o0hC_pZdzuFqjbGW7cdeZR-TWCULNZnzzle-X7OchaPm_4fxVufMS-GkjpubE75qvcr4Qf6Wm5HvMHgGwBRSSQUVj7kXD6hBmEa8wnu6FIa0lFssF2NWIm4tW3Yx");

const app = express();

app.get('/', (req, res) => {

  res.json({ hello: "world" });
});

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

const server = app.listen(3001, () => {
  const host = server.address().address;
  const port = server.address().port;
  
  console.log(`app running at ${host}:${port}`);
});