var mongoose = require('mongoose');

var messageSchema = new mongoose.Schema({ 
	content : String 
	location : {
		name : String,
		address : String
	}
});

module.exports = mongoose.model('Message', MessageSchema);
