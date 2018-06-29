import React, { Component } from 'react';
import { yelpLogo } from './yelp.jsx';

class App extends React.Component {
  render() {
    return (
			<div id="wrapper">

					<header id="header" class="alt">
            <div className='slack-yelp-add'>


              {yelpLogo} 
              <div className='add-sign'>
                +
              </div>

        
            <img className='slack-logo' src="https://res.cloudinary.com/nenry/image/upload/v1530205092/slack_256.png" alt=""/>
           
            </div>
          <h1 id='slack-header' >Yelp on Slack</h1>
          <h2 id='sub-header'>Deciding where to eat, made easy</h2>
              <a  href="https://slack.com/oauth/authorize?client_id=387620765190.386684586035&scope=incoming-webhook,commands,users:read,chat:write:bot"><img alt="Add to Slack" height="40" width="139" src="https://platform.slack-edge.com/img/add_to_slack.png" srcset="https://platform.slack-edge.com/img/add_to_slack.png 1x, https://platform.slack-edge.com/img/add_to_slack@2x.png 2x" /></a>
            </header>

					<nav id="nav">
              <ul>
                <li><a href="#intro" class="active">Introduction</a></li>
                <li><a href="#first">Features</a></li>
                <li><a href="#cta">Get Started</a></li>
              </ul>
            </nav>

					<div id="main">

							<section id="intro" class="main">
                <div class="spotlight">
                  <div class="content">
                    <header class="major">
                      <h2>What is Yelp on Slack?</h2>
                    </header>
                <p> Can't decide what's for lunch? Tired of always going to the same place? Have no fear, Yelp on Slack is here. 
                    Yelp on Slack is an extension that delivers a curated list of restaurants for you and your team to vote on. Give it a try and let's eat!
                </p>
                    <ul class="actions">
                      <li><a href="generic.html" class="button">Learn More</a></li>
                    </ul>
                  </div>
              <span class="image"><img src="https://i.imgur.com/Tl93xIJ.gif" alt="" /></span>
                </div>
              </section>

							<section id="first" class="main special">
                <header class="major">
                  <h2>Magna veroeros</h2>
                </header>
                <ul class="features">
                  <li>
                    <span class="icon major style1 fa-code"></span>
                    <h3>Ipsum consequat</h3>
                    <p>Sed lorem amet ipsum dolor et amet nullam consequat a feugiat consequat tempus veroeros sed consequat.</p>
                  </li>
                  <li>
                    <span class="icon major style3 fa-copy"></span>
                    <h3>Amed sed feugiat</h3>
                    <p>Sed lorem amet ipsum dolor et amet nullam consequat a feugiat consequat tempus veroeros sed consequat.</p>
                  </li>
                  <li>
                    <span class="icon major style5 fa-diamond"></span>
                    <h3>Dolor nullam</h3>
                    <p>Sed lorem amet ipsum dolor et amet nullam consequat a feugiat consequat tempus veroeros sed consequat.</p>
                  </li>
                </ul>
                <footer class="major">
                  <ul class="actions special">
                    <li><a href="generic.html" class="button">Learn More</a></li>
                  </ul>
                </footer>
              </section>

							<section id="cta" class="main special">
                <header class="major">
                  <h2>Learn more about Yelp on Slack</h2>
                  <p id="explore-text">Explore our code or visit the Slack app store below</p>
                </header>
                <footer class="major">
                  <ul class="actions special">
                    <li><a href="https://github.com/edmundho/yelp_on_slack" class="button primary">GITHUB</a></li>
                    <li><a href="generic.html" class="button">APP STORE</a></li>
                  </ul>
                </footer>
              </section>

            </div>

					<footer id="footer">
              <section class="developer-section">
                <h2>About the Project</h2>
                <p class='developer-text'>Yelp on Slack was developed over the course of 5 days by a team of four software developers. We're a group of passionate engineers with a host of other great projects. Check them out on our Githubs!</p>
                <ul class="icons">
              <li><a class="icon fa-github alt" href="https://github.com/Nenry"><span class="label">GitHub</span></a> Henry</li>
              <li><a class="icon fa-github alt" href="https://github.com/edmundho"><span class="label">GitHub</span></a> Edmund</li>
              <li><a class="icon fa-github alt" href="https://github.com/marshallycheng"><span class="label">GitHub</span></a> Marshall</li>
              <li><a class="icon fa-github alt" href="https://github.com/travishn"><span class="label">GitHub</span></a> Travis</li>
                </ul>
              </section>
          <p class="copyright">&copy;  2018 App Academy Yelp on Slack Project | Design: <a href="https://html5up.net">HTML5 UP</a></p>
            </footer>

          </div>
    );
  }
}

export default App;