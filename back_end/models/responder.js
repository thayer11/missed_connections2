var mongoose = require('mongoose');

ResponderSchema = new mongoose.Schema({ 
	content : String, 
	created_by: [{type: Schema.Types.ObjectId,ref: 'User'}],
	responded_to: [{type: Schema.Types.ObjectId,ref: 'User'}]
})


module.exports = mongoose.model('Responder', ResponderSchema);