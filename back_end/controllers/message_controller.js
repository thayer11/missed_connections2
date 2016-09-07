var Message = require('../models/message.js')
var User = require('../models/user.js')
var Response = require('../models/responder.js')

module.exports.messagesAddOne = function(req, res) {
    console.log(req.body)
    console.log('above req.user');
    console.log(req.user);    
    
    Message
        .create({
            content: req.body.content,
            location: req.body.location,
            created_by: req.user._id,
    
    }, function(err, messages) {
            if(err) {
                console.log("Error creating model");
                res
                  .status(400)
                  .json(err);
                  return ;
            } else {
              console.log("Message created", messages);
                User.findById(req.user._id,function(err, user){
                  if(err){
                    console.log("you suck");
                  }
                  else{
                    user.messages.push(messages._id);
                    user.save(function(err){
                      if(err){
                        res.json({message: "Error saving the groupt to add to: "+err, error:true})
                        return ;
                      }

                res
                  .status(201)
                  .json(messages);

                    })
                  }
                })
            }
        });
};

module.exports.messagesGetAll = function(req, res){
    console.log("GET the messages");
    console.log(req.query);

  // var offset = 0;
  // var count = 5;

  // if (req.query && req.query.offset){
  //   offset = parseInt(req.query.offset, 10);
  // }

  // if (req.query && req.query.count){
  //   count = parseInt(req.query.count, 10);
  // }

Message
  .find()
  // .skip(offset)
  .populate('created_by')
  // .limit(count)
  .exec(function(err, messages){
    console.log("Found messages", messages.length);
    res
      .json(messages);
  });
}

module.exports.ResponsePostAll = function(req, res) {
    console.log(req.body)
    console.log('above req.user');
    console.log(req.user);    
    
    Response
        .create({
            content: req.body.content,
            responded_to: req.body.responded_to,
            created_by: req.user._id
    
    }, function(err, response) {
            if(err) {
                console.log("Error creating model");
                res
                  .status(400)
                  .json(err);
                  return ;
            } else {
              console.log("Response created", response);
                Message.findById(req.body.responded_to,function(err, message){
                  if(err){
                    console.log("you suck");
                  }
                  else{
                    message.responses.push(response);
                    message.save(function(err){
                      if(err){
                        res.json({message: "Error saving the group to add to: "+err, error:true})
                        return ;
                      }

                res
                  .status(201)
                  .json(message);

                    })
                  }
                })
            }
        });
};

module.exports.ResponseGetAll = function(req, res){
    console.log("GET the messages");
    console.log(req.query);

  // var offset = 0;
  // var count = 5;

  // if (req.query && req.query.offset){
  //   offset = parseInt(req.query.offset, 10);
  // }

  // if (req.query && req.query.count){
  //   count = parseInt(req.query.count, 10);
  // }

Response
  .find()
  // .skip(offset)
  .populate('created_by')
  // .limit(count)
  .exec(function(err, responses){
    console.log("Found responses", responses.length);
    res
      .json(responses);
  });
}

 
 