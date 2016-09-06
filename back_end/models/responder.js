var mongoose = require('mongoose');
var User = require("./user.js").schema;
var Schema = mongoose.Schema;

ResponderSchema = new mongoose.Schema({ 
	content : String, 
	created_by: {type: Schema.Types.ObjectId,ref: 'User'},
	responded_to: {type: Schema.Types.ObjectId,ref: 'Message'}
})


module.exports = mongoose.model('Responder', ResponderSchema);