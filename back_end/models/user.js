var mongoose = require('mongoose');
var Schema   = mongoose.Schema;
var Message  = require('./message.js'),
// MessageSchema = mongoose.model('Message').schema,


UserSchema = mongoose.Schema({
	facebook: {
        id: Number,
        token: String,
        email: String,
        name: String,
        photos: String,
    },
    	messages : [{ type: Schema.Types.ObjectId, ref: 'Message' }]
});

module.exports = mongoose.model('User', UserSchema);
