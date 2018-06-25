var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var WorkspaceSchema = new Schema(
  {
    teams: {type: Object, required: true}


  }
);

module.exports = mongoose.Model('Workspace', WorkspaceSchema);