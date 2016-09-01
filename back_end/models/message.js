var mongoose = require('mongoose');


MessageSchema = new mongoose.Schema({ 
	content : String, 
	location : {
		name : String,
		address : String
	}
	 creator : { type: Number, ref: 'User' },
	 responder : { type: Number, ref: 'User' }
});

module.exports = mongoose.model('Message', MessageSchema);
