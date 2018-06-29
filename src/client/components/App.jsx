import React, { Component } from 'react';
import { yelpLogo } from './yelp.jsx';

class App extends React.Component {
  render() {
    return (
			<div id="wrapper">

					<header id="header" class="alt">
              <span class="logo"><img src="images/logo.svg" alt="" /></span>
              <h1>Yelp on Slack</h1>
              <a href="https://slack.com/oauth/authorize?client_id=387620765190.386684586035&scope=incoming-webhook,commands,users:read,chat:write:bot"><img alt="Add to Slack" height="40" width="139" src="https://platform.slack-edge.com/img/add_to_slack.png" srcset="https://platform.slack-edge.com/img/add_to_slack.png 1x, https://platform.slack-edge.com/img/add_to_slack@2x.png 2x" /></a>
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
                <p> Yelp on Slack gathers the best restaurants according to your selected location and will output the top 3 best-rated restaurants.
       These top 3 selections will also vary because who want's to eat the same thing everyday for lunch? In addition, we integrated Slack's greatest emojis
           so you can quickly vote amongst your coworkers on where to go.</p>
                    <ul class="actions">
                      <li><a href="generic.html" class="button">Learn More</a></li>
                    </ul>
                  </div>
                  <span class="image"><img src="images/pic01.jpg" alt="" /></span>
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
                  <h2>Congue imperdiet</h2>
                  <p>Donec imperdiet consequat consequat. Suspendisse feugiat congue<br />
                    posuere. Nulla massa urna, fermentum eget quam aliquet.</p>
                </header>
                <footer class="major">
                  <ul class="actions special">
                    <li><a href="generic.html" class="button primary">Get Started</a></li>
                    <li><a href="generic.html" class="button">Learn More</a></li>
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
              <p class="copyright">&copy; Untitled. Design: <a href="https://html5up.net">HTML5 UP</a>.</p>
            </footer>

          </div>
    );
  }
}

export default App;