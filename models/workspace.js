var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var workspaceSchema = new Schema(
  {
    team_id: {type: String, required: true},
    access_token: {type: String, required: true},


  }
);
module.exports = mongoose.model('workspaces', workspaceSchema);
