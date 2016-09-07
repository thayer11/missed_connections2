var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var User = require("./user.js").schema;
var Response = require("./responder.js").schema;

MessageSchema = new mongoose.Schema({ 
	content : String, 
	location : {
		name : String,
		address : String
	},
	 created_by : { type: Schema.Types.ObjectId, ref: 'User' },
	 responses : [Response]
});

module.exports = mongoose.model('Message', MessageSchema);
