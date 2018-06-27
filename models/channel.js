var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var channelSchema = new Schema(
  {
    channel_id: {type: String, required: true, index: {unique: true}},
    access_token: {type: String, required: true},
    webhook_url: {type: String, required: true}
  }
);
module.exports = mongoose.model('channels', channelSchema);
