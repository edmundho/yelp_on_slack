# Yelp on Slack
[Description Page](https://yelponslack.herokuapp.com/)

## Background and Overview

Deciding where to go for lunch is a common issue in most workspaces. Often, with no one willing to make a final decision, teams resort to going to the same restaurant time and time again. Yelp on Slack is an app dedicated to solving this issue. Users provide basic info such as a max distance and a price range, and the app returns a curated list of restaurants that match the criteria in a poll format. Team members can then vote for their desired option and enjoy a nice lunch with the team.

![Demo](https://i.imgur.com/Tl93xIJ.gif)

## Technologies

### MERN Stack:
* Description page:
  * React (v16.4.0)
* Backend:
  * MongoDB, mLab
  * Express
  * Node

### APIs
* Yelp Fusion API
  * Search (Search businesses based on filters)
  * Business Show (Grab info on specific businesses)
* Slack API
  * Incoming Webhooks (Sending messages)
  * Slash commands (Receiving requests)
  * Dialog Options (Creating submission form)


### Implementation Details
Yelp on Slack was designed to ping the Slack API twice and the Yelp API once every cycle. These are the steps of a cycle:

1. The cycle begins with a user installing our app. Once installed, our database stores that channel and its unique webhook url, which allows us to post messages in that channel. 
2. When a user uses the slash command `/letseat`, we receive that request at our predetermined route, which will then send off a preconstructed dialog object to the Slack API based off a `trigger_id`, which allows us to target the particular user who sent the request.
3. The user then fills out the form with their chosen filters, and when they submit it, it again hits another predetermined route. There, we parse the filters and reorganize the data and send off a request to the Yelp API. 
4. We again reorganize the restaurant data from Yelp and format it into a message which is sent to the channel that the request originated from via the stored webhook in our database. 

### Code Snippets
This is the route for accepting form submissions. We parse the data, reorganize it, and sent off a request to Yelp Fusion API
```javascript
//route to accept button-presses and form submissions
app.post('/interactive-component', (req, res) => {
  const body = JSON.parse(req.body.payload);
  Channel.findOne({channel_id: body.channel.id}).then( channel => {
    // check for verification token
    if (body.token === process.env.SLACK_VERIFICATION_TOKEN) {
      debug(`Form submission received: ${body.submission.trigger_id}`);
  
      // we send an empty response because slack requires us to respond within 3 seconds or else timeout
      res.send('');
      const searchObj = YelpAPIUtil.setClientObject(body);
      // ping yelp api with our search terms from dialog form
      client.search(searchObj).then(restaurants => {
        // select random, unique restaurants from payload
        const businesses = YelpAPIUtil.selectRandomRestaurants(restaurants.jsonBody.businesses);
        // send poll to channel that made request
        YelpAPIUtil.restaurantMessage(businesses, channel.webhook_url);
      }, (err) => {
        res.sendStatus('Not enough restaurants');
      });
    } else {
      debug("Token mismatch");
      res.sendStatus(500);
      }
    }, () => {
      res.sendStatus(505);
    }
  );

});
```

When we store channels' information in our database, we want to account for the possibility that channels may reinstall, which will update webhook urls. By using `findOneAndUpdate()`, we can account for this and update the webhook as necessary without needing to create a new entry, which keeps our database clear of unnecessary data. 
```javascript
     const conditions = { channel_id: channelId};
      const newEntry = { channel_id: channelId, access_token: channelAccessToken, webhook_url: webHookUrl };
      // if channel already exists, update it with new info. if it doesn't, create it
      Channel.findOneAndUpdate(conditions, newEntry, {upsert: true}, function(err){
        if (err) return res.send(500, {error: err});
        // redirect to home/splash page upon successful authorization
        return res.redirect('https://yelponslack.herokuapp.com');
      });
```

We use a bayesian average based on reviews/ratings in order to determine which restaurants should be returned for a given set of filters. We use the Fisher-Yates shuffle algorithm to determine which restaurants of those should be returned. Our goal for this was to return only credible restaurants with good average ratings while also changing up the results every poll, even if the same filters were used. We considered many different strategies of selecting restaurants, and eventually settled on this one for its accessibility and ease of implementation. 

```javascript
// Fisher Yates Shuffle Algorithm
const selectRandomRestaurants = (businesses) => {
  const arr = [];
  while (arr.length < 3) {
    const randomNum = Math.floor(Math.random() * businesses.length);

    if (arr.indexOf(randomNum) > -1 || arr.includes(businesses[randomNum])) continue;
    arr.push(businesses[randomNum]);
  }

  return arr;
};
```


## Developers
[Marshall](https://github.com/marshallycheng)
[Travis](https://github.com/travishn)
[Henry](https://github.com/nenry)
[Edmund](https://github.com/edmundho)

### Potential Future Features(difficult)
- [ ] Yelp on Slack will put in a reservation for the selected restaurant from poll
- [ ] Alerts that notify slack channel members when a poll is closing within a specified time
- [ ] Automatically starts poll on specified day for companies that have weekly team lunches
- [ ] Implement Google Maps API to provide directions to restaurant
- [ ] Create an option for users to vote on to create a new poll with a different curated list of restaurant options
