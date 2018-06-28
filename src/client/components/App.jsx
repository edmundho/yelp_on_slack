import React, { Component } from 'react';

class App extends Component {
  render() {
    return (
      <div className='whole-container'>
      <div className ='header-container'>
      
      <div className='header'>
        
        <div className='header-app-name'>Yelp on Slack</div>
 
          <div> 
            <a href="">Github</a>
            <a href="">Linkedins</a>          
          </div>
      </div>
      
      </div>
      <div className='content-container'>
          <div>Logo</div>
          <h1>Yelp, Slack Integration</h1>
          <div className='logo-plus'>
            <img className='yelp-logo' src="http://www.itsbennycho.com/Pizza%20Factory/icons/yelp.png" alt=""/> 
            <div>
            +
            </div>
            <img className='slack-logo' src="http://res.cloudinary.com/nenry/image/upload/v1530205092/slack_256.png" alt=""/> 

          </div>
          <a href="https://slack.com/oauth/authorize?scope=incoming-webhook&client_id=387620765190.386684586035">
            <img  alt="Add to Slack" height="40" width="139" src="https://platform.slack-edge.com/img/add_to_slack.png"
              srcset="https://platform.slack-edge.com/img/add_to_slack.png 1x, https://platform.slack-edge.com/img/add_to_slack@2x.png 2x" />
          </a>
      </div>
        
      </div>

    );
  }
}

export default App;