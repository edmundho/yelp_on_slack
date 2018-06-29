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
              <h1>Yelp on Slack</h1>
              <p>Insert some text here</p>
            </header>

					<nav id="nav">
              <ul>
                <li><a href="#intro" class="active">Introduction</a></li>
                <li><a href="#first">First Section</a></li>
                <li><a href="#second">Second Section</a></li>
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

							<section id="second" class="main special">
                <header class="major">
                  <h2>Ipsum consequat</h2>
                  <p>Donec imperdiet consequat consequat. Suspendisse feugiat congue<br />
                    posuere. Nulla massa urna, fermentum eget quam aliquet.</p>
                </header>
                <ul class="statistics">
                  <li class="style1">
                    <span class="icon fa-code-fork"></span>
                    <strong>5,120</strong> Etiam
									</li>
                  <li class="style2">
                    <span class="icon fa-folder-open-o"></span>
                    <strong>8,192</strong> Magna
									</li>
                  <li class="style3">
                    <span class="icon fa-signal"></span>
                    <strong>2,048</strong> Tempus
									</li>
                  <li class="style4">
                    <span class="icon fa-laptop"></span>
                    <strong>4,096</strong> Aliquam
									</li>
                  <li class="style5">
                    <span class="icon fa-diamond"></span>
                    <strong>1,024</strong> Nullam
									</li>
                </ul>
                <p class="content">Nam elementum nisl et mi a commodo porttitor. Morbi sit amet nisl eu arcu faucibus hendrerit vel a risus. Nam a orci mi, elementum ac arcu sit amet, fermentum pellentesque et purus. Integer maximus varius lorem, sed convallis diam accumsan sed. Etiam porttitor placerat sapien, sed eleifend a enim pulvinar faucibus semper quis ut arcu. Ut non nisl a mollis est efficitur vestibulum. Integer eget purus nec nulla mattis et accumsan ut magna libero. Morbi auctor iaculis porttitor. Sed ut magna ac risus et hendrerit scelerisque. Praesent eleifend lacus in lectus aliquam porta. Cras eu ornare dui curabitur lacinia.</p>
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
              <section>
                <h2>Aliquam sed mauris</h2>
                <p>Sed lorem ipsum dolor sit amet et nullam consequat feugiat consequat magna adipiscing tempus etiam dolore veroeros. eget dapibus mauris. Cras aliquet, nisl ut viverra sollicitudin, ligula erat egestas velit, vitae tincidunt odio.</p>
                <ul class="actions">
                  <li><a href="generic.html" class="button">Learn More</a></li>
                </ul>
              </section>
              <section>
                <h2>Etiam feugiat</h2>
                <dl class="alt">
                  <dt>Address</dt>
                  <dd>1234 Somewhere Road &bull; Nashville, TN 00000 &bull; USA</dd>
                  <dt>Phone</dt>
                  <dd>(000) 000-0000 x 0000</dd>
                  <dt>Email</dt>
                  <dd><a href="#">information@untitled.tld</a></dd>
                </dl>
                <ul class="icons">
                  <li><a href="#" class="icon fa-twitter alt"><span class="label">Twitter</span></a></li>
                  <li><a href="#" class="icon fa-facebook alt"><span class="label">Facebook</span></a></li>
                  <li><a href="#" class="icon fa-instagram alt"><span class="label">Instagram</span></a></li>
                  <li><a href="#" class="icon fa-github alt"><span class="label">GitHub</span></a></li>
                  <li><a href="#" class="icon fa-dribbble alt"><span class="label">Dribbble</span></a></li>
                </ul>
              </section>
          <p class="copyright">&copy;  2015 App Academy Yelp on Slack Project | Design: <a href="https://html5up.net">HTML5 UP</a>.</p>
            </footer>

          </div>
    );
  }
}

export default App;