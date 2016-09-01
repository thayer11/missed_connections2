var Message = require('../models/message.js')

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
                console.log("Message created", messages);
                res
                  .status(201)
                  .json(messages);
            }
        });
};

module.exports.messagesGetAll = function(req, res){
    console.log("GET the messages");
    console.log(req.query);

  var offset = 0;
  var count = 5;

  if (req.query && req.query.offset){
    offset = parseInt(req.query.offset, 10);
  }

  if (req.query && req.query.count){
    count = parseInt(req.query.count, 10);
  }

Message
  .find()
  .skip(offset)
  //.limit(count)
  .exec(function(err, messages){
    console.log("Found messages", messages.length);
    res
      .json(messages);
  });
}

