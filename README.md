# Yelp on Slack
Yelp on Slack is an app that facilitates lunch place decision making.

## Background and Overview

Deciding on a place to go for lunch is a common issue amongst teams in the workplace. Often times, with no one willing to make a final decision, teams resort to going to the same restaurant time after time. With Yelp on Slack, we intend to solve this problem by filtering data from nearby restaurants and presenting a curated list of options based on the user’s inputs.

## Functionality & MVPs
- [ ] Users can input a location, a maximum distance, a price range, and a time range for the poll

- [ ] Yelp on Slack will return a curated list of restaurant options along with a timed poll for users to vote

- [ ] If the poll is inconclusive, yack will independently select an option

- [ ] Menu, types of food, highlighted dish, and photos will be displayed for selected restaurants

### Bonus Features:
- [ ] Yelp on Slack will put in a reservation for the selected restaurant from poll
- [ ] Alerts that notify slack channel members when a poll is closing within a specified time
- [ ] Automatically starts poll on specified day for companies that have weekly team lunches
- [ ] Implement Google Maps API to provide directions to restaurant

## Technologies and Project Approach

### Mern Stack:
* Frontend:
  * React (v16.4.0)
* Backend:
  * MongoDB
  * Express.js
  * Node.js
### APIs:
* Yelp Fusion API
* Slack API
  * Incoming Webhook
  * Slash Commands

### Accessing Dataset
Utilize user input to hit the fusion api at the backend search route
Create a composite score as a function of average rating and total number of reviews to select top three options and create get requests for each restaurant

### Formating Data
Create a request to the Fusion API and utilize the information from the dataset to return a timed poll
Determine the capabilities of the slack interface in terms of formatting for display of restaurant information

### Slack API
Integrate webhooks and slash commands for starting a poll and shortcut commands
Employ Slack message builder to create restaurant poll form

### UX
Frontend Interface
Integrate an “Add to Slack” button that installs the Yelp on Slack app to the user’s slack workplace
Provide basic setup instructions and slash commands
Backend
Our backend will act as a middleman for formatting data between Slack and Yelp APIs
After completing the restaurant poll form, slack sends JSON to our backend which we configure to the appropriate query params format to send to yelp
Our backend takes yelp responses and filters the JSON dataset based on our composite score function, sending it back to slack for users to view

## Accomplished Over the Weekend
* N/A
* N/A
* N/A
* N/A
* N/A

## Group Members 
Travis Nguyen, Marshall Cheng, Henry Nguyen, Edmund Ho


