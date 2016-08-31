var mongoose = require('mongoose');
Message = require('./message.js'),
MessageSchema = mongoose.model('Message').schema,


UserSchema = mongoose.Schema({
	facebook: {
        id: Number,
        token: String,
        email: String,
        name: String,
        photos: String,
    },
    	messages : [MessageSchema]
});

module.exports = mongoose.model('User', UserSchema);
