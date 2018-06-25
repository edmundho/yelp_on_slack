const mongoose = require('mongoose');
const Workspace = require('./models/workspace');


var sample = new Workspace({team_id: '1', access_token: '2'});

sample.save();
  // sample.save(function (err) {
  //   if (err) {
  //     console.log(err);
  //     return;
  //   }
  //   console.log('New workspace: ' + sample);
 
  // });
