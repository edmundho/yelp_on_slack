const mongoose = require('mongoose');
const Workspace = require('./models/workspace');


var sample = new Workspace({team_id: '1', access_token: '2'});
var sample2 = new Workspace({team_id: '4', access_token: '5'});

sample.save();
sample2.save();
  // sample.save(function (err) {
  //   if (err) {
  //     console.log(err);
  //     return;
  //   }
  //   console.log('New workspace: ' + sample);
 
  // });
