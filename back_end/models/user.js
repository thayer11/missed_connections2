var mongoose = require('mongoose');
var UserSchema = mongoose.Schema({
	facebook: {
        id: Number,
        token: String,
        email: String,
        name: String,
        photos: String,
    },
});
module.exports = mongoose.model('User', UserSchema);
