var mongoose = require('mongoose');
var Message = mongoose.model('Message');

module.exports.messagesAddOne = function(req, res) {
    console.log(req.body)

    Message
        .create({
            content: req.body.content,
            location: req.body.location,
             
    }, function(err, messages) {
            if(err) {
                console.log("Error creating model");
                res
                  .status(400)
                  .json(err);
            } else {
                console.log("Message created", message);
                res
                  .status(201)
                  .json(message);
            }
        });
};